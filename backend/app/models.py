from datetime import datetime
from app import db


class JobApplication(db.Model):
    __tablename__ = "job_applications"

    id = db.Column(db.Integer, primary_key=True)
    company_name = db.Column(db.String(255), nullable=False)
    position_title = db.Column(db.String(255), nullable=False)
    job_url = db.Column(db.String(500))
    location = db.Column(db.String(255))
    status = db.Column(
        db.Enum("applied", "interview", "offer", "rejected", "withdrawn"),
        nullable=False,
        default="applied",
    )
    employment_type = db.Column(
        db.Enum("Praktikum", "Vollzeit", "Teilzeit"), nullable=True, default="Praktikum"
    )
    application_date = db.Column(db.Date)
    source = db.Column(db.String(100))
    contact_person = db.Column(db.String(255))
    contact_email = db.Column(db.String(255))
    salary_range = db.Column(db.String(100))
    notes = db.Column(db.Text)
    follow_up_date = db.Column(db.Date)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "company_name": self.company_name,
            "position_title": self.position_title,
            "job_url": self.job_url,
            "location": self.location,
            "status": self.status,
            "employment_type": self.employment_type,
            "application_date": self.application_date.isoformat() if self.application_date else None,
            "source": self.source,
            "contact_person": self.contact_person,
            "contact_email": self.contact_email,
            "salary_range": self.salary_range,
            "notes": self.notes,
            "follow_up_date": self.follow_up_date.isoformat() if self.follow_up_date else None,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }
