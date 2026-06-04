import asyncio
from playwright.async_api import async_playwright
import os


async def capture_screenshots():
    base_url = "http://localhost:3000"
    screenshots_dir = os.path.join(
        os.path.dirname(os.path.abspath(__file__)), "screenshots"
    )
    os.makedirs(screenshots_dir, exist_ok=True)

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={"width": 1920, "height": 1080})
        page = await context.new_page()

        # Screenshot 1: Login page
        print("Capturing login page...")
        await page.goto(base_url, wait_until="networkidle")
        await page.wait_for_timeout(1000)
        await page.screenshot(
            path=os.path.join(screenshots_dir, "01_login.png"), full_page=False
        )

        # Login as admin
        print("Logging in as admin...")
        await page.fill("input[name='username']", "admin")
        await page.fill("input[name='password']", "admin")
        await page.click("button[type='submit']")
        await page.wait_for_timeout(3000)

        # Screenshot 2: Dashboard
        print("Capturing dashboard...")
        await page.screenshot(
            path=os.path.join(screenshots_dir, "02_dashboard.png"), full_page=False
        )

        # Function to click tab by text
        async def capture_tab(tab_text, filename):
            try:
                print(f"Capturing {filename}...")
                buttons = await page.query_selector_all("aside nav button")
                for button in buttons:
                    text = await button.inner_text()
                    if tab_text in text:
                        await button.click()
                        await page.wait_for_timeout(2000)
                        await page.screenshot(
                            path=os.path.join(screenshots_dir, filename),
                            full_page=False,
                        )
                        return True
                print(f"Tab {tab_text} not found")
                return False
            except Exception as e:
                print(f"Error: {e}")
                return False

        # Capture various tabs
        await capture_tab("Hộ khẩu", "03_households.png")
        await capture_tab("Nhân khẩu", "04_residents.png")
        await capture_tab("Danh mục khoản thu", "05_fees.png")
        await capture_tab("Nghĩa vụ", "06_payments.png")
        await capture_tab("Báo cáo", "07_reports.png")
        await capture_tab("Người dùng", "08_users.png")
        await capture_tab("Biến động", "09_events.png")

        await browser.close()
        print(f"Done! Screenshots saved to {screenshots_dir}")


if __name__ == "__main__":
    asyncio.run(capture_screenshots())
