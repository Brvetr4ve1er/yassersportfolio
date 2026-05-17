import QRCode from "qrcode";

const PALETTE = {
  dark: "#0a1f0e",
  light: "#f5f0e8",
};

export async function generateQrDataUrl(payload: string): Promise<string> {
  return QRCode.toDataURL(payload, {
    errorCorrectionLevel: "M",
    margin: 1,
    width: 512,
    color: PALETTE,
  });
}

export async function generateQrSvg(payload: string): Promise<string> {
  return QRCode.toString(payload, {
    type: "svg",
    errorCorrectionLevel: "M",
    margin: 1,
    color: PALETTE,
  });
}
