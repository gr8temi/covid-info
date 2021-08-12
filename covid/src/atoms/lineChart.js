
import React, {
    useEffect,
    useRef
} from "react";

import * as d3 from "d3";

function LineChart({
    data,
    dependencies,
    fields,
    picker
}) {
    const ref = useRef();
    const parseDate = picker === "month" ? d3.timeParse("%Y-%m") : d3.timeParse("%Y-%m-%d");
    const transformedData = data
        .map((eachData) => {
            return {
                ...eachData,
                Date: parseDate(eachData.Date.slice(0, 10)),
            };
        })
        .slice(0, 100);
    useEffect(() => {
        const margin = {
            top: 20,
            right: 30,
            bottom: 30,
            left: 50
        };
        const width =
            parseInt(d3.select("#lineChart").style("width")) -
            margin.left -
            margin.right;
        const height =
            parseInt(d3.select("#lineChart").style("height")) -
            margin.top -
            margin.bottom;

        const svg = d3
            .select(ref.current)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        const x = d3
            .scaleTime()
            .domain(
                d3.extent(transformedData, function(d) {
                    return d.Date;
                })
            )
            .range([0, width]);
        const xAxis = d3.axisBottom(x);
        const xticks = d3.timeMonth;
        svg
            .append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        if (picker === "month") {
            svg.call(xAxis.ticks(xticks))
        }

        const max_value = Math.max(...fields.map((field) =>
            d3.max(transformedData, function(d) {
                return d[field.field];
            })
        ));

        const y = d3
            .scaleLinear()
            .domain([0, max_value])
            .range([height, 0]);

        svg.append("g").call(d3.axisLeft(y));
        fields.map((field) =>
            svg
            .append("path")
            .datum(transformedData)
            .attr(
                "d",
                d3
                .line()
                .x(function(d) {
                    return x(d.Date);
                })
                .y(function(d) {
                    return y(d[field.field]);
                }).curve(d3.curveCardinal)
            )
            .attr("fill", "none")
            .attr("stroke", field.color)
        );
        const size = 10;
        svg.append('text')
            .attr('x', (width / 2))
            .attr('y', (margin.top / 5 - 5))
            .attr('text-anchor', 'middle')
            .attr('font-size', '16px')
            .attr('fill', 'black')
            .text(`Graph showing ${fields.map(field=>field.field).join(", ")}`)
        svg.selectAll("mydots")
            .data(fields)
            .enter()
            .append("rect")
            .attr("x", 100)
            .attr("y", function(d, i) {
                return 100 + i * (size + 5)
            })
            .attr("width", size)
            .attr("height", size)
            .style("fill", function(d) {
                return d.color
            })

        svg.selectAll("mylabels")
            .data(fields)
            .enter()
            .append("text")
            .attr("x", 100 + size * 1.2)
            .attr("y", function(d, i) {
                return 105 + i * (size + 5) + (size / 2)
            })
            .style("fill", function(d) {
                return d.color
            })
            .text(function(d) {
                return d.field
            })
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")
    }, [dependencies]);

    return ( <div id = "lineChart"
        style = {
            {
                width: "100",
                height: "400px",
                marginLeft: "20px",
                backgroundColor: "#E5E4E2",
            }
        } >
        <svg ref={ref}> </svg> 
        </div>
    );
}

export default LineChart;