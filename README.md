## Website

[Visit my profile website](https://gauravmahto.github.io/)

### Steps

1. Clone this repo
2. (Optional, for conda users) Run `conda env create -f environment.yml` to create a conda environment
3. (Optional, for conda users) Run `conda activate portfolio_env` to activate the conda environment
4. (Recommended) Create and activate a Python virtual environment:
   - `python3 -m venv venv`
   - `source venv/bin/activate`
5. Install requirements with pip:
   - `pip install -r requirements.txt`
6. Run `mkdocs serve` to test locally
7. Run `mkdocs gh-deploy` to deploy to GitHub Pages

### Requirements

All dependencies are listed in `requirements.txt` in pip-compatible format. To install them:

```sh
pip install -r requirements.txt
```

This will install all necessary packages, including `mkdocs` and `mkdocs-material` for local documentation development with the Material theme. If you encounter dependency conflicts, ensure you are using a clean virtual environment.
