#!/usr/bin/env python3
import json
import os
import re
from pathlib import Path


HTML_PATH = Path('static/projects/drake-career-analysis/html/drake-career.html')
OUT_PATH = Path('static/projects/drake-career-analysis/html/choropleth.html')

def extract_arrays(html_text):
    # Find the first Plotly.newPlot data block and extract arrays for locations, z, hovertext
    # This regex is simplistic but scoped to the first choropleth trace in the notebook HTML
    def extract_array(key):
        m = re.search(rf'"{key}":\[(.*?)\]', html_text)
        if not m:
            return None
        # Re-wrap as JSON array
        arr_text = '[' + m.group(1) + ']'
        # Replace Javascript null with JSON null (already same), ensure proper JSON
        try:
            return json.loads(arr_text)
        except json.JSONDecodeError:
            # Sometimes single quotes sneak in; try sanitize
            arr_text2 = arr_text.replace("'", '"')
            return json.loads(arr_text2)

    locations = extract_array('locations')
    z = extract_array('z')
    hovertext = extract_array('hovertext')
    if locations is None or z is None or hovertext is None:
        raise RuntimeError('Could not extract arrays from HTML (locations/z/hovertext)')
    return locations, z, hovertext

def build_html(locations, z, hovertext):
    data = [
        (loc, val, name)
        for loc, val, name in zip(locations, z, hovertext)
        if loc not in (None, 'null')
    ]
    locs = [d[0] for d in data]
    vals = [d[1] for d in data]
    names = [d[2] for d in data]

    # Minimal HTML that uses Plotly JS CDN directly (no Python plotly package needed)
    return f"""<!doctype html>
<html lang=\"en\">
  <head>
    <meta charset=\"utf-8\" />
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />
    <title>Choropleth — Drake Debut Streams</title>
    <script src=\"https://cdn.plot.ly/plotly-2.27.0.min.js\"></script>
    <style>
      html, body {{ height: 100%; margin: 0; }}
      #choropleth {{ width: 100%; height: 520px; }}
      @media (max-width: 640px) {{ #choropleth {{ height: 420px; }} }}
    </style>
  </head>
  <body>
    <div id=\"choropleth\"></div>
    <script>
      const locations = {json.dumps(locs)};
      const values = {json.dumps(vals)};
      const names = {json.dumps(names)};

      const data = [{{
        type: 'choropleth',
        locationmode: 'ISO-3',
        locations: locations,
        z: values,
        text: names,
        colorscale: 'Twilight',
        colorbar: {{dtick: 200000000, tick0: 0}},
        hovertemplate: '<b>%{{text}}</b><br>Streams=%{{z}}<extra></extra>'
      }}];

      const layout = {{
        title: 'Drake Total Debut Stream Popularity',
        margin: {{l: 10, r: 10, t: 40, b: 10}},
        geo: {{ projection: {{type: 'natural earth'}} }}
      }};

      Plotly.newPlot('choropleth', data, layout, {{responsive: true}});
    </script>
  </body>
  </html>"""

def main():
    if not HTML_PATH.exists():
        raise SystemExit(f'Input HTML not found: {HTML_PATH}')
    html = HTML_PATH.read_text(encoding='utf-8', errors='ignore')
    locations, z, hovertext = extract_arrays(html)
    html_out = build_html(locations, z, hovertext)
    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUT_PATH.write_text(html_out, encoding='utf-8')
    print(f'Saved choropleth (static HTML) to {OUT_PATH}')

if __name__ == '__main__':
    main()
