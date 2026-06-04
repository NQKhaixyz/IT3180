import os
from weasyprint import HTML


def create_presentation_pdf(html_path, output_path):
    """Convert HTML presentation to PDF using WeasyPrint"""

    # Convert HTML file to PDF
    html = HTML(filename=html_path)

    # Write PDF
    html.write_pdf(output_path)

    print(f"PDF generated successfully: {output_path}")
    print(f"File size: {os.path.getsize(output_path) / 1024:.1f} KB")


if __name__ == "__main__":
    # Paths
    base_dir = os.path.dirname(os.path.abspath(__file__))
    html_file = os.path.join(base_dir, "bluemoon_presentation.html")
    pdf_file = os.path.join(base_dir, "bluemoon_presentation.pdf")

    # Check if HTML file exists
    if not os.path.exists(html_file):
        print(f"Error: HTML file not found: {html_file}")
        exit(1)

    print("Creating BlueMoon presentation PDF...")
    print(f"Input: {html_file}")
    print(f"Output: {pdf_file}")
    print()

    # Generate PDF
    create_presentation_pdf(html_file, pdf_file)

    print()
    print("Done! Open bluemoon_presentation.pdf to view the presentation.")
