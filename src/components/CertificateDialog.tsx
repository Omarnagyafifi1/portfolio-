import { useEffect, useRef } from "react";
import { ExternalLink, X } from "lucide-react";
import type { PortfolioData } from "../types";

type Certificate = PortfolioData["certifications"][number];

type CertificateDialogProps = {
  certificate: Certificate | null;
  onClose: () => void;
};

export function CertificateDialog({ certificate, onClose }: CertificateDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (certificate && !dialog.open) dialog.showModal();
    if (!certificate && dialog.open) dialog.close();
  }, [certificate]);

  return (
    <dialog
      ref={dialogRef}
      className="certificate-dialog"
      aria-labelledby="certificate-dialog-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
    >
      {certificate ? (
        <div className="certificate-dialog__content">
          <div className="detail-dialog__bar">
            <div>
              <span className="eyebrow">{certificate.issuer}</span>
              <h2 id="certificate-dialog-title">{certificate.name}</h2>
            </div>
            <button className="icon-button detail-dialog__close" type="button" onClick={onClose} aria-label="Close certificate preview">
              <X size={20} />
            </button>
          </div>
          <img className="certificate-dialog__image" src={certificate.preview} alt={`${certificate.name} issued by ${certificate.issuer}`} />
          <a className="button button--outline" href={certificate.file} target="_blank" rel="noreferrer">
            Open original certificate <ExternalLink size={14} />
          </a>
        </div>
      ) : null}
    </dialog>
  );
}
