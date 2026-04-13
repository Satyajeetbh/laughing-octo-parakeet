from fpdf import FPDF

class PDFReport(FPDF):
    def header(self):
        self.set_font("Arial", "B", 12)
        self.cell(0, 10, 'Comprehensive PDF Report', align='C', ln=True)
        self.ln(10)

    def footer(self):
        self.set_y(-15)
        self.set_font("Arial", "I", 8)
        self.cell(0, 10, f'Page {self.page_no()}', align='C')

    def chapter_title(self, title):
        self.set_font("Arial", "B", 12)
        self.cell(0, 10, title, 0, 1, 'L')
        self.ln(4)

    def chapter_body(self, body):
        self.set_font("Arial", "", 12)
        self.multi_cell(0, 10, body)
        self.ln()

    def add_code_block(self, code):
        self.set_font("Courier", "", 10)
        self.multi_cell(0, 10, code)
        self.ln()

def create_pdf():
    pdf = PDFReport()
    pdf.add_page()

    # Title and Table of Contents
    pdf.set_font("Arial", "B", 16)
    pdf.cell(0, 10, 'Table of Contents', 0, 1, 'C')
    pdf.ln(10)
    
    contents = [
        "1. Introduction",
        "2. System Requirements",
        "3. Implementation Overview",
        "4. Code Examples",
        "5. Conclusion"
    ]
    
    for item in contents:
        pdf.cell(0, 10, item, 0, 1)
    
    pdf.add_page()

    # Section 1: Introduction
    pdf.chapter_title("1. Introduction")
    pdf.chapter_body("This report details the key aspects of the ResumeIntel EduRevolution submission...")

    # Section 2: System Requirements
    pdf.chapter_title("2. System Requirements")
    pdf.chapter_body("The following are the system requirements for the project...")

    # Section 3: Implementation Overview
    pdf.chapter_title("3. Implementation Overview")
    pdf.chapter_body("This section describes how the project is implemented...")

    # Section 4: Code Examples
    pdf.chapter_title("4. Code Examples")
    code_sample = '''def example_function():\n    print("This is an example function.")\n    '''
    pdf.add_code_block(code_sample)

    # Section 5: Conclusion
    pdf.chapter_title("5. Conclusion")
    pdf.chapter_body("In conclusion, the ResumeIntel EduRevolution submission provides...")

    # Save the PDF
    pdf_file_path = "resumeintel_report.pdf"
    pdf.output(pdf_file_path)

if __name__ == "__main__":
    create_pdf()