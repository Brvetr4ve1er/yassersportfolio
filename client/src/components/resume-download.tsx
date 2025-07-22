import { Download, FileText, ExternalLink } from "lucide-react";

export default function ResumeDownload() {
  const handleDownload = () => {
    // In a real application, this would trigger a download of the actual PDF
    // For now, we'll show a notification
    alert("Resume download would start here. Please contact me directly for my latest resume.");
  };

  const handleViewOnline = () => {
    // Navigate to a dedicated resume page or external link
    window.open("/resume", "_blank");
  };

  return (
    <div className="resume-download-section">
      <div className="glass-card p-6">
        <div className="resume-header">
          <div className="resume-icon">
            <FileText className="w-8 h-8 text-blue-400" />
          </div>
          <div className="resume-info">
            <h3 className="resume-title">Professional Resume</h3>
            <p className="resume-description">
              Download my complete professional resume with detailed experience, education, and achievements.
            </p>
          </div>
        </div>
        
        <div className="resume-actions">
          <button
            onClick={handleDownload}
            className="resume-btn resume-btn-primary"
            aria-label="Download resume as PDF"
          >
            <Download className="w-5 h-5" />
            Download PDF
          </button>
          <button
            onClick={handleViewOnline}
            className="resume-btn resume-btn-secondary"
            aria-label="View resume online"
          >
            <ExternalLink className="w-5 h-5" />
            View Online
          </button>
        </div>
        
        <div className="resume-metadata">
          <div className="metadata-item">
            <span className="metadata-label">Last Updated:</span>
            <span className="metadata-value">January 2025</span>
          </div>
          <div className="metadata-item">
            <span className="metadata-label">Format:</span>
            <span className="metadata-value">PDF, 2 pages</span>
          </div>
          <div className="metadata-item">
            <span className="metadata-label">Languages:</span>
            <span className="metadata-value">English, Arabic, French</span>
          </div>
        </div>
      </div>
    </div>
  );
}