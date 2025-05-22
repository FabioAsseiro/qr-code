/* eslint-disable @next/next/no-img-element */
"use client";

import { QRCodeCanvas } from "qrcode.react";
import { FaUpload } from "react-icons/fa";
import { useRef, useState } from "react";

export default function Home() {
  const [linkValue, setLinkValue] = useState<string>('');
  const [fgColor, setFgColor] = useState<string>('#000000');
  const [bgColor, setBgColor] = useState<string>('#ffffff');
  const [logo, setLogo] = useState<string>('/');
  const [size, setSize] = useState<number>(24);
  const qrCodeRef = useRef<HTMLDivElement>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if(file){
      const reader = new FileReader()

      reader.onload = () => {
        if (reader.result){
          setLogo(reader.result as string);
        }
      }

      reader.readAsDataURL(file);
    }
  }

  const handleDownload = () => {
    if(!qrCodeRef.current){
      return
    }

    const canvas = qrCodeRef.current.querySelector('canvas') as HTMLCanvasElement;

    if (!canvas){
      return
    }

    const link = document.createElement('a')

    link.href = canvas.toDataURL('image/png')
    link.download = 'qr-code.png'
    link.click()
  }


  return (
    <main className="container">
      <section className="title-container">
        <h1 className="page-title">
          Gere e customize QR code <span>dinamicamente</span>
        </h1>

        <img src="/arrow.svg" alt="seta" className="arrow-detail"/>
      </section>

      <section className="qr-code-container">
        <div className="qr-code">
          <div className="link-input">
            <label htmlFor="link">Digite seu link</label>
            <input type="text" id="link" placeholder="Seu link aqui" value={linkValue} onChange={(e) => setLinkValue(e.target.value)}/>
          </div>
          <div className="qr-code-preview">
            <p>QR code preview</p>
            <div ref={qrCodeRef}>
              <QRCodeCanvas
                value={linkValue}
                title={linkValue}
                size={200}
                bgColor={bgColor}
                fgColor={fgColor}
                level={"L"}
                imageSettings={{
                  src: logo,
                  x: undefined,
                  y: undefined,
                  height: Number(size),
                  width: Number(size),
                  opacity: 1,
                  excavate: true,
                  crossOrigin: "anonymous",
                }}
              />
            </div>
            
          </div>
        </div>
        <div className="qr-code-custom">
          <div className="customization-container">
            <h3>Cores</h3>
            <div className="input-container colors">
              <div className="input-box">
                <label htmlFor="fgColor">Cor principal</label>
                <input type="color" id="fgColor" className="input-color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} />
              </div>
              <div className="input-box">
                <label htmlFor="bgColor">Cor do fundo</label>
                <input type="color" id="bgColor" className="input-color" value={bgColor} onChange={(e) => setBgColor(e.target.value)}/>
              </div>
            </div>
          </div>
          <div className="customization-container">
            <h3>Logo</h3>
            <div className="input-container">
              <div className="input-box">
                <label htmlFor="logo">Insira seu logo</label>
                <input type="file" id="logo" className="input-file" accept="image/*" onChange={handleLogoChange}/>
                <button className="input-file-button">
                  <FaUpload />
                  Escolher arquivo
                </button>
              </div>
              <div className="input-box">
                <label htmlFor="logoSize">Tamanho da logo</label>
                <select name="logoSize" id="logoSize" value={size} onChange={(e) => setSize(Number(e.target.value))}>
                  <option value="24">24px x 24px</option>
                  <option value="38">38px x 38px</option>
                </select>
              </div>
            </div>
          </div>
          <button className="download-button" onClick={handleDownload}>Baixar QR code</button>
        </div>
      </section>
    </main>
  );
}
