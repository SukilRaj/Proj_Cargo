# app.py
from flask import Flask, render_template, request, jsonify
import placement_algorithm
import item_retrieval_algorithm
import rearrangement_algorithm
import waste_management_algorithm
import time_simulation_algorithm

app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')
@app.route('/optimize_packing', methods=['POST'])
def optimize_packing_api():
    items = request.get_json()
    optimized_packing = placement_algorithm.get_optimized_packing(items)
    return jsonify({'optimizedPacking': optimized_packing})

@app.route("/search", methods=["GET"])
def search():
    item_id = request.args.get("item_id")
    item_name = request.args.get("item_name")
    item = item_retrieval_algorithm.item_retrieval(item_id, item_name)
    return jsonify({"item": item})

@app.route("/rearrangement", methods=["POST"])
def rearrangement():
    container_data = request.get_json()["container_data"]
    item_data = request.get_json()["item_data"]
    recommendations = rearrangement_algorithm.rearrangement_recommendations(container_data, item_data)
    return jsonify({"recommendations": recommendations})

@app.route("/waste", methods=["GET"])
def waste():
    waste_items = waste_management_algorithm.waste_identification()
    return jsonify({"waste_items": waste_items})

@app.route("/simulate", methods=["POST"])
def simulate():
    num_days = request.get_json()["num_days"]
    results = time_simulation_algorithm.time_simulation(num_days)
    return jsonify({"results": results})

if __name__ == "__main__":
    app.run(debug=True)