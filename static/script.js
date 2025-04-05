const itemTableBody = document.getElementById('item-table-body');
const addItemForm = document.getElementById('add-item-form');
const optimizePackingButton = document.getElementById('optimize-packing-button');
const optimizedPackingResult = document.getElementById('optimized-packing-result');

// add event listener to add item form
addItemForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const itemId = document.getElementById('id').value;
  const itemName = document.getElementById('name').value;
  const itemWidth = document.getElementById('width').value;
  const itemDepth = document.getElementById('depth').value;
  const itemHeight = document.getElementById('height').value;
  const itemMass = document.getElementById('mass').value;
  const itemPriority = document.getElementById('priority').value;
  const itemExpiryDate = document.getElementById('expiry-date').value;
  const itemUsageLimit = document.getElementById('usage-limit').value;
  const itemPreferredZone = document.getElementById('preferred-zone').value;

  // add item to table
  const itemRow = document.createElement('tr');
  itemRow.innerHTML = `
    <td>${itemId}</td>
    <td>${itemName}</td>
    <td>${itemWidth}</td>
    <td>${itemDepth}</td>
    <td>${itemHeight}</td>
    <td>${itemMass}</td>
    <td>${itemPriority}</td>
    <td>${itemExpiryDate}</td>
    <td>${itemUsageLimit}</td>
    <td>${itemPreferredZone}</td>
  `;
  itemTableBody.appendChild(itemRow);
});

// add event listener to optimize packing button
optimizePackingButton.addEventListener('click', () => {
  // get all items from table
  const items = [];
  const itemRows = itemTableBody.children;
  for (const itemRow of itemRows) {
    if (itemRow.tagName === 'TR') {
      const itemId = itemRow.cells[0].textContent;
      const itemName = itemRow.cells[1].textContent;
      const itemWidth = itemRow.cells[2].textContent;
      const itemDepth = itemRow.cells[3].textContent;
      const itemHeight = itemRow.cells[4].textContent;
      const itemMass = itemRow.cells[5].textContent;
      const itemPriority = itemRow.cells[6].textContent;
      const itemExpiryDate = itemRow.cells[7].textContent;
      const itemUsageLimit = itemRow.cells[8].textContent;
      const itemPreferredZone = itemRow.cells[9].textContent;

      items.push({
        id: itemId,
        name: itemName,
        width: itemWidth,
        depth: itemDepth,
        height: itemHeight,
        mass: itemMass,
        priority: itemPriority,
        expiryDate: itemExpiryDate,
        usageLimit: itemUsageLimit,
        preferredZone: itemPreferredZone,
      });
    }
  }

  // send request to backend API to optimize packing
  fetch('/optimize_packing', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(items),
  })
 .then((response) => response.json())
 .then((data) => {
      // display optimized packing result
      optimizedPackingResult.innerHTML = `
        <h2>Optimized Packing Result</h2>
        <table>
          <thead>
            <tr>
              <th>Item ID</th>
              <th>Item Name</th>
              <th>Container ID</th>
              <th>Container Name</th>
            </tr>
          </thead>
          <tbody>
            ${data.optimizedPacking.map((item) => `
              <tr>
                <td>${item.itemId}</td>
                <td>${item.itemName}</td>
                <td>${item.containerId}</td>
                <td>${item.containerName}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    })
 .catch((error) => console.error(error));
});