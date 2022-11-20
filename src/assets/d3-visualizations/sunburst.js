// inspired by https://observablehq.com/@d3/zoomable-sunburst

svgCreated = false;


function drawSunburst(data) {

  const width = 1200;
  const radius = width / 8;

  this.figure = d3.select("div#sunburst");

  const root = partition(data);
  root.each(d => d.current = d);

  var svg;
  if (svgCreated) {
    svg = this.figure
      .select("svg");
  } else {
    svg = this.figure
      .append("svg")
      .attr("viewBox", [0, 0, width, width])
      .style("font", "18px sans-serif");
    svgCreated = true;
  }

  const g = svg.append("g")
    .attr("transform", `translate(${width / 2}, ${width / 2})`);

  var myColor = d3.scaleOrdinal()
    .domain(["Faculty of Technology (FTK)", "Faculty of Arts and Humanities (FKH)"])
    .range(["#7bcce7", "#cff69c"]);


  const path = g.append("g")
    .selectAll("path")
    .data(root.descendants().slice(1))
    .join("path")
    .attr("fill", d => { while (d.depth > 1) d = d.parent; { return myColor(d.data.label) } })
    .attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 1 : 0.8) : 0)
    .attr("pointer-events", d => arcVisible(d.current) ? "auto" : "auto")
    .attr("d", d3.arc()
      .startAngle(d => d.x0)
      .endAngle(d => d.x1)
      .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
      .padRadius(radius * 1.5)
      .innerRadius(d => d.y0 * radius)
      .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1))
    );


  path.filter(d => d.children)
    .style("cursor", "pointer")
    .on("click", clicked);

  path.append("title")
    .text(d => `${d.data.name}\nTotal Publications: ${(d.data.publications !== undefined ? d.data.publications : d.data.totalChildPubs)}`);

  const label = g.append("g")
    .attr("pointer-events", "none")
    .attr("text-anchor", "middle")
    .style("user-select", "none")
    .selectAll("text")
    .data(root.descendants().slice(1))
    .join("text")
    .attr("dy", "0.45em")
    .attr("fill-opacity", d => +labelVisible(d.current))
    .attr("transform", d => labelTransform(d.current, d.current))
    .text(d => d.data.label);

  const parent = g.append("circle")
    .datum(root)
    .attr("r", radius)
    .attr("fill", "none")
    .attr("pointer-events", "all")
    .on("click", clicked);

  const centerData = d3.select("div.center-data")
    .datum(root)
    .on("click", clicked);

  function clicked(event, p) {
    parent.datum(p.parent || root);

    const eventConnectionPoint = document.getElementById('sunburst');
    eventConnectionPoint.dispatchEvent(new CustomEvent('sunburst-selection', { detail: p.data }));

    root.each(d => d.target = {
      x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
      x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
      y0: Math.max(0, d.y0 - p.depth),
      y1: Math.max(0, d.y1 - p.depth)
    });

    const t = g.transition().duration(750);

    path.transition(t)
      .tween("data", d => {
        const i = d3.interpolate(d.current, d.target);
        return t => d.current = i(t);
      })
      // .filter(function (d) {
      //     return +this.getAttribute("fill-opacity") || arcVisible(d.target);
      // })
      // .attr("fill", d => { while (d.depth > 1) d = d.parent; {console.log(myColor(d.data.name)); return myColor(d.data.name)} })
      .attr("fill-opacity", d => arcVisible(d.target) ? (d.children ? 1 : 0.8) : 0)
      // .attr("pointer-events", d => arcVisible(d.target) ? "auto" : "none")
      .attrTween("d", d => () => myarc(d.current));


    label.filter(function (d) {
      return +this.getAttribute("fill-opacity") || labelVisible(d.target);
    }).transition(t)
      .attr("fill-opacity", d => +labelVisible(d.target))
      .attrTween("transform", d => () => labelTransform(d.current, d));
  }

  function arcVisible(d) {
    return d.y1 <= 4 && d.y0 >= 1 && d.x1 > d.x0;
  }

  function labelVisible(d) {
    return d.y1 <= 4 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.07;
  }

  function labelTransform(d, dChildCheck) {
    const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
    const y = (d.y0 + d.y1) / 2 * radius;
    if (dChildCheck.depth < 3) {
      return `rotate(${x - 90}) translate(${y},0) rotate(${x <= 270 ? 270 : 90})`;
    } else {
      return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
    }
  }

  function partition(data) {
    const root = d3.hierarchy(data)
      // .count();
      .sum(d => d.publications)
      // .sort((a, b) => b.publications - a.publications)
      .sort((a,b) => d3.descending(a.value, b.value));

    return d3.partition()
      .size([2 * Math.PI, root.height + 1])
      (root);
  }

  var myarc = d3.arc()
    .startAngle(d => d.x0)
    .endAngle(d => d.x1)
    .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
    .padRadius(radius * 1.5)
    .innerRadius(d => d.y0 * radius)
    .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1));


}
