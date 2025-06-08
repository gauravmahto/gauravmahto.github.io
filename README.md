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

**Note:** Some scientific/data packages such as `imagecodecs` and `multidict` are commented out in `requirements.txt` because they may fail to build on macOS or Python 3.12+ with pip. These are optional and only needed for certain scientific workflows. If you require them, consider using conda (see steps above) or a compatible Python version/environment. They are *not* required for documentation or mkdocs workflows.
