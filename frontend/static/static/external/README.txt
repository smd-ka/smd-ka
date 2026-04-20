This directory contains static logo files and other images
for direct access by external services and integrations (e.g. Authentik).

Symlinks are used to ensure the latest assets are always served without duplication.
Vite/Svelte will check during build that all symlinks actually exist and are valid.

These are the known usages so for, listed per service:
- authentik:
	- Brand "smd-karlsruhe.de"
		- smd-ka.svg as Logo
		- favicon.png as Favicon
		- schloss.jpg as Background
