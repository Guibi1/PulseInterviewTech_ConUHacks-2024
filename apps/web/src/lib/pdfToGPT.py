import io
from openai import OpenAI
import requests
import fitz


OpenAI.api_key = "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"

client = OpenAI(api_key="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")


# Google Drive file URL
file_url = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"


def get_text_from_pdf(file_url):
    # Download PDF content
    pdf_content = requests.get(file_url).content

    # Use PyMuPDF to extract text
    doc = fitz.open(stream=pdf_content, filetype="pdf")
    text = ""
    for page_num in range(doc.page_count):
        page = doc[page_num]
        text += page.get_text()

    return text


def getTextFromPdf(text):
    print(text)
    finalReponse = client.chat.completions.create(
        model="gpt-3.5-turbo-1106",
        messages=[
            {
                "role": "system",
                "content": "Youre an helpful assistant that will help the"
            },
            {
                "role": "user",
                "content": f"Write this five time : {text}"
            }
        ],
    )
    return finalReponse.choices[0].message.content


def main():
    pdf_text = get_text_from_pdf(file_url)
    final_output = getTextFromPdf(pdf_text)
    print(final_output)


if __name__ == "__main__":
    main()
