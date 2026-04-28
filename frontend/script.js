const nodes = [
  { id: 'planner', label: 'Planner' },
  { id: 'researcher', label: 'Researcher' },
  { id: 'critic', label: 'Critic' },
  { id: 'executor', label: 'Executor' },
];

const connections = [
  { from: 'planner', to: 'researcher' },
  { from: 'planner', to: 'critic' },
  { from: 'researcher', to: 'executor' },
  { from: 'critic', to: 'executor' },
];

const svg = document.getElementById('agent-graph');
const centerGraph = document.querySelector('.center-graph');
const nodesGroup = document.getElementById('nodes');
const connectionsGroup = document.getElementById('connections');
const bgLinesGroup = document.getElementById('bg-lines');

function initBgLines() {
  const width = centerGraph.clientWidth;
  const height = centerGraph.clientHeight;
  for (let i = 0; i < 5; i++) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const y = Math.random() * height;
    const d = `M 0 ${y} Q ${width/4} ${y + 20}, ${width/2} ${y} T ${width} ${y}`;
    line.setAttribute('d', d);
    line.setAttribute('class', 'bg-line');
    bgLinesGroup.appendChild(line);
  }
}

function resizeGraph() {
  const width = centerGraph.clientWidth;
  const height = centerGraph.clientHeight;
  
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  
  nodesGroup.innerHTML = '';
  connectionsGroup.innerHTML = '';
  
  const nodePositions = {
    planner: { x: width / 2, y: height * 0.2 },
    researcher: { x: width * 0.2, y: height * 0.5 },
    critic: { x: width * 0.8, y: height * 0.5 },
    executor: { x: width / 2, y: height * 0.8 },
  };
  
  nodes.forEach(node => {
    const pos = nodePositions[node.id];
    const nodeElem = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    nodeElem.setAttribute('class', 'node');
    nodeElem.setAttribute('data-id', node.id);
    nodeElem.setAttribute('transform', `translate(${pos.x - 50}, ${pos.y - 25})`);
    
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('width', 100);
    rect.setAttribute('height', 50);
    
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', 50);
    text.setAttribute('y', 25);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'middle');
    text.textContent = node.label;
    
    nodeElem.appendChild(rect);
    nodeElem.appendChild(text);
    nodesGroup.appendChild(nodeElem);
  });
  
  connections.forEach(conn => {
    const fromPos = nodePositions[conn.from];
    const toPos = nodePositions[conn.to];
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', `M ${fromPos.x} ${fromPos.y} L ${toPos.x} ${toPos.y}`);
    path.setAttribute('class', 'connection');
    path.setAttribute('data-from', conn.from);
    path.setAttribute('data-to', conn.to);
    connectionsGroup.appendChild(path);
  });
}

function simulateActivity() {
  setInterval(() => {
    const allNodes = document.querySelectorAll('.node');
    const allConnections = document.querySelectorAll('.connection');
    
    allNodes.forEach(node => node.classList.remove('active'));
    allConnections.forEach(conn => conn.classList.remove('active'));
    
    const randomNode = allNodes[Math.floor(Math.random() * allNodes.length)];
    randomNode.classList.add('active');
    const nodeId = randomNode.getAttribute('data-id');
    
    allConnections.forEach(conn => {
      if (conn.getAttribute('data-from') === nodeId || conn.getAttribute('data-to') === nodeId) {
        conn.classList.add('active');
      }
    });
  }, 3000);
}

window.addEventListener('resize', resizeGraph);
initBgLines();
resizeGraph();
simulateActivity();
