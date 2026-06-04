import os
from weasyprint import HTML, CSS


def create_slideshow_pdf(html_path, output_path):
    """Convert HTML slideshow to PDF using WeasyPrint"""

    # Convert HTML file to PDF
    html = HTML(filename=html_path)

    # Write PDF
    html.write_pdf(output_path)

    print(f"PDF generated successfully: {output_path}")
    print(f"File size: {os.path.getsize(output_path) / 1024:.1f} KB")


if __name__ == "__main__":
    # Paths
    base_dir = os.path.dirname(os.path.abspath(__file__))
    html_file = os.path.join(base_dir, "slideshow.html")
    pdf_file = os.path.join(base_dir, "slideshow.pdf")

    # Check if HTML file exists
    if not os.path.exists(html_file):
        print(f"Error: HTML file not found: {html_file}")
        exit(1)

    print("Creating slideshow PDF...")
    print(f"Input: {html_file}")
    print(f"Output: {pdf_file}")
    print()

    # Generate PDF
    create_slideshow_pdf(html_file, pdf_file)

    print()
    print("Done! Open slideshow.pdf to view your presentation.")
