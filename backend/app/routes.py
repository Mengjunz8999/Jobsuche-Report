from datetime import datetime

from flask import Blueprint, jsonify, request

from app import db
from app.models import JobApplication

jobs_bp = Blueprint("jobs", __name__)


def parse_date(value):
    """Convert an 'YYYY-MM-DD' string from the frontend into a date object."""
    if not value:
        return None
    return datetime.strptime(value, "%Y-%m-%d").date()


# GET /api/jobs  -> list all applications, optional ?status=interview filter
@jobs_bp.route("", methods=["GET"])
def list_jobs():
    status_filter = request.args.get("status")

    query = JobApplication.query
    if status_filter:
        query = query.filter_by(status=status_filter)

    jobs = query.order_by(JobApplication.application_date.desc()).all()
    return jsonify([job.to_dict() for job in jobs])


# GET /api/jobs/<id> -> single application
@jobs_bp.route("/<int:job_id>", methods=["GET"])
def get_job(job_id):
    job = JobApplication.query.get_or_404(job_id)
    return jsonify(job.to_dict())


# POST /api/jobs -> create a new application
@jobs_bp.route("", methods=["POST"])
def create_job():
    data = request.get_json()

    if not data.get("company_name") or not data.get("position_title"):
        return jsonify({"error": "company_name and position_title are required"}), 400

    job = JobApplication(
        company_name=data["company_name"],
        position_title=data["position_title"],
        job_url=data.get("job_url"),
        location=data.get("location"),
        status=data.get("status", "applied"),
        employment_type=data.get("employment_type"),
        application_date=parse_date(data.get("application_date")),
        source=data.get("source"),
        contact_person=data.get("contact_person"),
        contact_email=data.get("contact_email"),
        salary_range=data.get("salary_range"),
        notes=data.get("notes"),
        follow_up_date=parse_date(data.get("follow_up_date")),
    )

    db.session.add(job)
    db.session.commit()
    return jsonify(job.to_dict()), 201


# PUT /api/jobs/<id> -> update an existing application
@jobs_bp.route("/<int:job_id>", methods=["PUT"])
def update_job(job_id):
    job = JobApplication.query.get_or_404(job_id)
    data = request.get_json()

    job.company_name = data.get("company_name", job.company_name)
    job.position_title = data.get("position_title", job.position_title)
    job.job_url = data.get("job_url", job.job_url)
    job.location = data.get("location", job.location)
    job.status = data.get("status", job.status)
    job.employment_type = data.get("employment_type", job.employment_type)
    job.source = data.get("source", job.source)
    job.contact_person = data.get("contact_person", job.contact_person)
    job.contact_email = data.get("contact_email", job.contact_email)
    job.salary_range = data.get("salary_range", job.salary_range)
    job.notes = data.get("notes", job.notes)

    if "application_date" in data:
        job.application_date = parse_date(data["application_date"])
    if "follow_up_date" in data:
        job.follow_up_date = parse_date(data["follow_up_date"])

    db.session.commit()
    return jsonify(job.to_dict())


# DELETE /api/jobs/<id> -> remove an application
@jobs_bp.route("/<int:job_id>", methods=["DELETE"])
def delete_job(job_id):
    job = JobApplication.query.get_or_404(job_id)
    db.session.delete(job)
    db.session.commit()
    return "", 204
