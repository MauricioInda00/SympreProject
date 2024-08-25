from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://example_user:password@localhost/leetcode_app'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Define a Problem model
class Problem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    hints = db.Column(db.Text)
    solution = db.Column(db.Text)
    stats = db.Column(db.JSON)

# Create the database tables
with app.app_context():
    db.create_all()

# Routes

@app.route("/flask/data/<int:problem_id>", methods=["GET"])
def get_problem_data(problem_id):
    problem = Problem.query.get(problem_id)
    if problem:
        return jsonify({
            "title": problem.title,
            "description": problem.description,
            "hints": problem.hints,
            "solution": problem.solution,
            "stats": problem.stats
        })
    else:
        return jsonify({"error": "Problem not found"}), 404


@app.route("/flask/solution/<int:problem_id>", methods=["POST"])
def save_solution(problem_id):
    solution = request.json.get("solution", "")
    problem = Problem.query.get(problem_id)
    if problem:
        problem.solution = solution
        db.session.commit()
        return jsonify({"message": "Solution saved successfully!"})
    else:
        return jsonify({"error": "Problem not found"}), 404

if __name__ == "__main__":
    app.run(debug=True)
