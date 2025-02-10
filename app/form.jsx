'use client'
import { useState } from "react";
import { PDFDocument } from 'pdf-lib';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { saveAs } from 'file-saver';

export default function Form() {

    const [file, setFile] = useState(null)

    async function getDeviceId() {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        return result.visitorId; // Unique Device ID
    }


    async function attachDeviceIdToPDF(pdfBytes) {
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const deviceId = await getDeviceId();

        // Store the device ID inside the PDF metadata
        pdfDoc.setTitle('Licensed PDF');
        pdfDoc.setSubject(`Device ID: ${deviceId}`);

        const modifiedPdfBytes = await pdfDoc.save();

        // Trigger PDF download
        const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
        saveAs(blob, 'licensed_pdf.pdf');
    }

    async function validatePDFLicense(pdfBytes) {
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const metadata = pdfDoc.getSubject(); // Read stored device ID

        if (!metadata || !metadata.startsWith('Device ID:')) return false;

        const storedDeviceId = metadata.replace('Device ID: ', '');
        const currentDeviceId = await getDeviceId();

        return storedDeviceId === currentDeviceId; // True if the device matches
    }

    const [message, setMessage] = useState('');

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = async () => {
            const pdfBytes = new Uint8Array(reader.result);
            const isValid = await validatePDFLicense(pdfBytes);

            if (isValid) {
                setMessage('✅ PDF is valid. You can open it.');
            } else {
                setMessage('❌ Unauthorized device! Access denied.');
            }
        };
    };


    return (
        <>
            <div className="card bg-neutral md:w-1/2 w-full p-5 mt-10">
                <div
                    className="card mb-4 -mt-14 bg-primary grid p-6 place-items-center"
                >
                    <h3 className="text-white text-xl font-bold">
                        PDF GENERATOR
                    </h3>
                </div>
                <div className="lg:grid grid-cols-2 gap-2">
                    <div className="col-span-1 mb-1">
                        <label className="label" htmlFor="name">Name</label>
                        <input type="text" id="name" className="input w-full border-0 focus:outline-none focus:border-2 input-primary" />
                    </div>

                    <div className="col-span-1 mb-1">
                        <label className="label" htmlFor="name">Name</label>
                        <input type="text" id="name" className="input w-full border-0 focus:outline-none focus:border-2 input-primary" />
                    </div>

                </div>


                <div className="mb-6">
                    <label className="label" htmlFor="pdf">PDF FILE</label>
                    <input type="file" onChange={(e) => handleFileUpload(e)} id="pdf" accept="application/pdf" className="file-input w-full border-0 focus:outline-none focus:border-2 input-primary" />
                </div>

                <div className="mb-3">
                    <button  className="btn btn-primary w-full" >Generate</button>
                </div>

            </div>
        </>
    )
}

