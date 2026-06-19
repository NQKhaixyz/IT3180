const baseUrl = process.env.APP_BASE_URL || "http://127.0.0.1:3001";
const user = process.env.E2E_USER || "admin";
const password = process.env.E2E_PASSWORD || "admin";

function parseSetCookie(headers) {
  const raw = headers.get("set-cookie") || "";
  const match = raw.match(/bm_session=[^;]+/);
  return match ? match[0] : "";
}

async function expectOk(name, response) {
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`${name} failed (${response.status}): ${body}`);
  }
}

async function fetchAllPages(path, cookie, pageSize = 200) {
  const rows = [];
  for (let page = 1; page <= 200; page += 1) {
    const res = await fetch(`${baseUrl}${path}?page=${page}&pageSize=${pageSize}`, {
      headers: { cookie },
    });
    await expectOk(`fetch ${path} page ${page}`, res);
    const data = await res.json();
    if (!Array.isArray(data)) break;
    rows.push(...data);
    if (data.length < pageSize) break;
  }
  return rows;
}

function uniqueCode() {
  const now = Date.now();
  const rand = Math.floor(Math.random() * 10000);
  return `AUTO_LINK_${now}_${rand}`;
}

async function main() {
  let loginRes = await fetch(`${baseUrl}/api/auth/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ usernameOrEmail: user, password }),
  });

  if (!loginRes.ok) {
    const suffix = Date.now();
    const phoneSuffix = String(suffix).slice(-6).padStart(6, "0");
    const signupPayload = {
      username: `autoadmin_${suffix}`,
      email: `autoadmin_${suffix}@example.com`,
      phone: `0909.${phoneSuffix}`,
      fullName: `Auto Admin ${suffix}`,
      password: `Aa!${suffix}xyZ`,
    };

    const signupRes = await fetch(`${baseUrl}/api/auth/signup`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(signupPayload),
    });
    await expectOk("signup fallback admin", signupRes);

    loginRes = await fetch(`${baseUrl}/api/auth/login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ usernameOrEmail: signupPayload.username, password: signupPayload.password }),
    });
  }

  await expectOk("login", loginRes);
  const cookie = parseSetCookie(loginRes.headers);
  if (!cookie) throw new Error("login succeeded but session cookie not returned");
  const authHeaders = { cookie, "content-type": "application/json" };

  let households = await fetchAllPages("/api/households", cookie);
  let householdCount = households.length;

  if (householdCount === 0) {
    const suffix = Date.now();
    const phoneSuffix = String(suffix).slice(-6).padStart(6, "0");
    const createHouseholdRes = await fetch(`${baseUrl}/api/households`, {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify({
        apartmentNo: `T-${String(suffix).slice(-4)}`,
        floorNo: 1,
        ownerName: `Owner ${suffix}`,
        ownerPhone: `0907.${phoneSuffix}`,
        areaM2: 70,
        parkingSlots: 1,
      }),
    });
    await expectOk("create fallback household", createHouseholdRes);

    households = await fetchAllPages("/api/households", cookie);
    householdCount = households.length;
  }

  if (householdCount === 0) {
    throw new Error("No households found after fallback creation");
  }

  const feeCode = uniqueCode();
  const feeRes = await fetch(`${baseUrl}/api/fee-types`, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify({
      code: feeCode,
      name: `Auto Link ${feeCode}`,
      category: "MANDATORY",
      calcMethod: "FIXED",
      rate: 12345,
      graceDays: 0,
      lateFeeRule: "",
      policyNote: "",
      active: true,
    }),
  });
  await expectOk("create fee type", feeRes);
  const fee = await feeRes.json();

  const month = 12;
  const year = 2099;
  const periodRes = await fetch(`${baseUrl}/api/periods`, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify({ feeTypeId: fee.id, month, year }),
  });
  await expectOk("create period", periodRes);
  const period = await periodRes.json();

  const obligations = await fetchAllPages("/api/obligations", cookie);
  const linked = obligations.filter((o) => o.periodId === period.id);

  if (linked.length !== householdCount) {
    throw new Error(
      `Expected ${householdCount} obligations for new period ${period.id}, got ${linked.length}`,
    );
  }

  console.log(
    JSON.stringify(
      {
        ok: true,
        periodId: period.id,
        feeTypeId: fee.id,
        households: householdCount,
        obligationsCreated: linked.length,
      },
      null,
      2,
    ),
  );
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
