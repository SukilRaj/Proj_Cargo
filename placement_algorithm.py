class Container:
    def __init__(self, id, name, width, depth, height):
        self.id = id
        self.name = name
        self.width = width
        self.depth = depth
        self.height = height

class Item:
    def __init__(self, id, name, width, depth, height, mass, priority, expiry_date, usage_limit, preferred_zone):
        self.id = id
        self.name = name
        self.width = width
        self.depth = depth
        self.height = height
        self.mass = mass
        self.priority = priority
        self.expiry_date = expiry_date
        self.usage_limit = usage_limit
        self.preferred_zone = preferred_zone

# Define the available containers
containers = [
    Container(1, 'Container 1', 10, 10, 10),
    Container(2, 'Container 2', 20, 20, 20),
    Container(3, 'Container 3', 30, 30, 30),
]

def optimize_packing(items):
    optimized_packing = []
    for item in items:
        # Find the best container for the item
        best_container = None
        for container in containers:
            if container.width >= item.width and container.depth >= item.depth and container.height >= item.height:
                best_container = container
                break
        if best_container:
            optimized_packing.append({'itemId': item.id, 'itemName': item.name, 'containerId': best_container.id, 'containerName': best_container.name})
    return optimized_packing

def get_optimized_packing(items_data):
    items = []
    for item_data in items_data:
        item = Item(
            item_data['id'],
            item_data['name'],
            item_data['width'],
            item_data['depth'],
            item_data['height'],
            item_data['mass'],
            item_data['priority'],
            item_data['expiryDate'],
            item_data['usageLimit'],
            item_data['preferredZone']
        )
        items.append(item)
    return optimize_packing(items)