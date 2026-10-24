"""Check site CSS/JS paths and preserved assets used by cached HTML."""

import base64
import hashlib
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import parse_qs, urlsplit


class Assets(HTMLParser):
    def __init__(self):
        super().__init__()
        self.items = []

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if tag == "script" and "src" in attrs:
            self.items.append((attrs["src"], attrs.get("integrity")))
        elif tag == "link" and attrs.get("rel") == "stylesheet":
            self.items.append((attrs["href"], attrs.get("integrity")))


output = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("public")
pages = list(output.rglob("*.html"))
cached_pages = [Path(path) for path in sys.argv[2:]]
checked = 0
for page in pages + cached_pages:
    assets = Assets()
    assets.feed(page.read_text())
    for url, integrity in assets.items:
        parsed = urlsplit(url)
        if parsed.netloc or parsed.scheme:
            continue
        path = output / parsed.path.lstrip("/")
        assert path.is_file(), f"Missing asset in {page}: {url}"
        data = path.read_bytes()
        digest = hashlib.sha256(data).digest()
        if integrity:
            assert integrity == "sha256-" + base64.b64encode(digest).decode(), path
        if page in pages:
            # Current pages use stable paths with content-versioned queries.
            assert not integrity, f"SRI would reject new bytes for cached HTML: {url}"
            assert parse_qs(parsed.query).get("v") == [digest.hex()], url
            assert not re.search(r"\.[0-9a-f]{64}\.", parsed.path), url
        checked += 1

for directory in ("scss", "js"):
    for path in (output / directory).iterdir():
        match = re.search(r"\.([0-9a-f]{64})\.", path.name)
        if match:
            assert hashlib.sha256(path.read_bytes()).hexdigest() == match[1], path

assert checked, "No CSS or JavaScript references checked"
print(f"PASS: {checked} CSS/JS references; cached-page integrity and stable paths.")
