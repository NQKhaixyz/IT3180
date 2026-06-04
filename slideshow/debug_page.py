import asyncio
from playwright.async_api import async_playwright


async def debug_page():
    base_url = "http://localhost:3000"

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={"width": 1920, "height": 1080})
        page = await context.new_page()

        await page.goto(base_url, wait_until="networkidle")
        await page.wait_for_timeout(1000)

        # Login
        await page.fill("input[name='username']", "admin")
        await page.fill("input[name='password']", "admin")
        await page.click("button[type='submit']")
        await page.wait_for_timeout(3000)

        # Get all button texts and save to file
        buttons = await page.query_selector_all("button")
        with open("debug_buttons.txt", "w", encoding="utf-8") as f:
            f.write("All buttons found:\n")
            for i, button in enumerate(buttons):
                text = await button.inner_text()
                if text.strip():
                    f.write(f"  {i}: {text.strip()}\n")

        # Save HTML for analysis
        html = await page.content()
        with open("debug_page.html", "w", encoding="utf-8") as f:
            f.write(html)

        print("Debug files saved: debug_buttons.txt, debug_page.html")
        await browser.close()


if __name__ == "__main__":
    asyncio.run(debug_page())
