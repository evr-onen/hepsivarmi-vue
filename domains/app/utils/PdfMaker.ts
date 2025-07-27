import html2canvas from 'html2canvas';

const PdfMaker = async (args:Record<string, any>) => {

    const { jsPDF } = await import('jspdf'); // Dynamically import jsPDF to avoid SSR issues
    const pdf = new jsPDF('p', 'mm', 'a4');
    let isFirstPage = true;

    // Default background color
    const defaultBackgroundColor = '#ffffff';
    const backgroundColor = args.options?.background?.type === 'color'
        ? args.options.background.value
        : defaultBackgroundColor;

    for (const page of args.pages) {

        if (!isFirstPage) {
            pdf.addPage();
        }
        isFirstPage = false;


        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.left = '-9999px';
        container.style.width = '794px'; // A4 width (px)
        container.style.minHeight = '1123px'; // A4 height (px)
        container.style.backgroundColor = backgroundColor;
        container.style.padding = '8px';
        container.style.boxSizing = 'border-box';
        container.style.fontFamily = 'Arial, sans-serif';

        // Background image desteği
        if (args.options?.background?.type === 'image') {
            container.style.backgroundImage = `url(${args.options.background.value})`;
            container.style.backgroundSize = 'cover';
            container.style.backgroundPosition = 'center';
            container.style.backgroundRepeat = 'no-repeat';
        }

        const pdfCSS = `
        .pdf-container * {
            all: revert;
        }
        `

        const styleElement = document.createElement('style');
        styleElement.textContent = pdfCSS;

        container.className = 'pdf-container';
        container.innerHTML = page.content;

        document.head.appendChild(styleElement);
        document.body.appendChild(container);

        try {

            const canvas = await html2canvas(container, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff',
                width: 794,
                height: 1123
            });


            const imgData = canvas.toDataURL('image/jpeg', 0.95);
            pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297); // A4 boyutu (mm)

        } finally {

            document.body.removeChild(container);
            document.head.removeChild(styleElement);
        }
    }
    return pdf.output('blob');

}

export default PdfMaker;