import { useState } from 'react';

interface ScaricaContattoProps {
  lang: 'it' | 'en';
  copy: {
    save: string;
    saved: string;
  };
}

export default function ScaricaContatto({ copy }: ScaricaContattoProps) {
  const [scaricato, setScaricato] = useState(false);

  const handleDownload = () => {
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      "FN:Mattia Amendola",
      "N:Amendola;Mattia;;;",
      "TITLE:Software Architect",
      "TEL;TYPE=CELL:+393476031996",
      "EMAIL:mattiaa.mendolaa@gmail.com",
      "END:VCARD"
    ].join("\r\n");

    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "Mattia_Amendola.vcf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setScaricato(true);
    setTimeout(() => setScaricato(false), 3000);
  };

  return (
    <button onClick={handleDownload} className="btn-contatto" aria-label={copy.save}>
      {scaricato ? copy.saved : copy.save}
    </button>
  );
}
