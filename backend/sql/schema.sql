CREATE TABLE IF NOT EXISTS reports (
  id SERIAL PRIMARY KEY,
  report_uuid UUID NOT NULL UNIQUE,
  tracking_code VARCHAR(32) NOT NULL UNIQUE,
  report_type VARCHAR(20) NOT NULL CHECK (report_type IN ('anonymous', 'confidential')),
  category VARCHAR(50) NOT NULL CHECK (category IN ('crime', 'suspicious_activity', 'corruption', 'safety_hazard')),
  title VARCHAR(120) NOT NULL,
  description TEXT NOT NULL,
  location_label VARCHAR(200),
  status VARCHAR(20) NOT NULL DEFAULT 'received' CHECK (status IN ('received', 'under_review', 'forwarded', 'closed')),
  filter_status VARCHAR(40) NOT NULL,
  filter_reason TEXT,
  encrypted_contact JSONB,
  attachment_urls JSONB,
  source_fingerprint VARCHAR(128),
  trust_score_delta INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reports_tracking_code ON reports (tracking_code);
CREATE INDEX IF NOT EXISTS idx_reports_status ON reports (status);
CREATE INDEX IF NOT EXISTS idx_reports_created_at ON reports (created_at DESC);
