from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

from config import Config

db = SQLAlchemy()


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    # Allow the React dev server (default port 5173 ) to call this API
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

    from app.routes import jobs_bp
    app.register_blueprint(jobs_bp, url_prefix="/api/jobs")

    return app
