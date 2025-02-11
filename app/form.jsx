"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import CryptoJS from "crypto-js";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { saveAs } from "file-saver";

const SECRET_KEY = "your-secure-key"; // Change this to your secret key

export default function Form() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState("");

    // Function to get Device ID (unique fingerprint)
    async function getDeviceId() {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        return result.visitorId;
    }

    function handleFileUpload(e) {
        const file = e.target.files[0];
        if (file && file.type === "application/pdf") {
            setSelectedFile(file);
            setMessage("");
        } else {
            setMessage("Please upload a valid PDF file.");
        }
    }

    // Attach device ID and inject JavaScript into PDF
    async function attachDeviceIdToPDF() {
        if (!selectedFile) {
            setMessage("Upload a PDF first.");
            return;
        }
        const reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = async function () {
            try {
                const pdfBytes = reader.result;
                const pdfDoc = await PDFDocument.load(pdfBytes);
                const deviceId = await getDeviceId();

                // Encrypt Device ID
                const encryptedDeviceId = CryptoJS.AES.encrypt(deviceId, SECRET_KEY).toString();

                // Embed Encrypted Device ID as PDF Metadata
                pdfDoc.setSubject(`Device-License:${encryptedDeviceId}`);

                // Define JavaScript Code to be injected into the PDF as a valid string
                const jsCode = `
                    var validDevice = false;
                    var currentDeviceId = "${deviceId}";

                    fetch("https://your-server.com/validate-device", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ deviceId: currentDeviceId })
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (!data.valid) {
                            app.alert("Unauthorized Device! Closing PDF...");
                            app.execMenuItem("Close");
                        }
                    })
                    .catch(function(error) {
                        app.alert("Error: " + error);
                    });
                `;

                // Debugging: Ensure the `jsCode` is a string and properly defined
                console.log("JavaScript Code: ", jsCode); // Ensure the code is correct and see if it's properly printed
                if (typeof jsCode !== "string") {
                    throw new Error("The JavaScript code is not a valid string.");
                }

                // Inject JavaScript into the PDF
                pdfDoc.addJavaScript(jsCode);

                // Save the modified PDF
                const modifiedPdfBytes = await pdfDoc.save();
                const blob = new Blob([modifiedPdfBytes], { type: "application/pdf" });
                saveAs(blob, `Secure_${selectedFile.name}`);

                setMessage("✅ PDF secured with device lock.");
            } catch (error) {
                console.error("Error securing PDF:", error);
                setMessage("❌ Error securing PDF.");
            }
        };

 
    }

    return (
        <div className="card bg-neutral md:w-1/2 w-full p-5 mt-10">
            <div className="card mb-4 -mt-14 bg-primary grid p-6 place-items-center">
                <h3 className="text-white text-xl font-bold">PDF GENERATOR</h3>
            </div>

            <div className="mb-6">
                <label className="label" htmlFor="pdf">Upload PDF</label>
                <input 
                    type="file" 
                    onChange={(e)=> handleFileUpload(e) } 
                    id="pdf" 
                    accept="application/pdf" 
                    className="file-input w-full border-0 focus:outline-none focus:border-2 input-primary" 
                />
            </div>

            <div className="mb-3">
                <button className="btn btn-primary w-full" onClick={attachDeviceIdToPDF}>
                    Generate Secure PDF
                </button>
            </div>

            {message && <p className="text-center mt-3 font-bold">{message}</p>}
        </div>
    );
}