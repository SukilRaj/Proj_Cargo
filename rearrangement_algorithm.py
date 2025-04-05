def rearrangement_recommendations(container_data, item_data):
    # Your algorithm to calculate rearrangement recommendations goes here
    # For now, let's just return some dummy data
    return [
        {"container_id": container["container_id"], "item_id": item["item_id"], "position": (0, 0, 0)}
        for container in container_data
        for item in item_data
    ]