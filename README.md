# JigsawStack vOCR Demo

## Description
This application randomly selects an image from a folder of sample driver's license IDs, uploads it to JigsawStack, and processes the ID using optical character recognition (OCR) to extract information such as name, address, and ID number.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Dependencies](#dependencies)
- [File Structure](#file-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Prerequisites
- Node.js (version 12.0.0 or higher recommended)
- npm (version 6.0.0 or higher recommended)
- A JigsawStack account with API access

### Steps
1. Clone the repository:
   ```
   git clone https://github.com/danielrubinov97/JigsawStack_vOCR_Demo1.git
   ```
2. Navigate to the project directory:
   ```
   cd JigsawStack_vOCR_Demo1
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Set up your environment variables (see [Configuration](#configuration) section).

## Usage
To run the application, use the following command:

```
node index.js
```

The application will:
1. Select a random image from the `./SampleDriversLicenseIDs` folder
2. Upload the image to JigsawStack
3. Process the ID using OCR to extract information
4. Log the results to the console

## Configuration
Create a `.env` file in the root directory with the following variables:

```
JIGSAWSTACK_API_KEY=your_api_key_here
JIGSAWSTACK_PUBLIC_KEY=your_public_key_here
```

Ensure you have a folder named `SampleDriversLicenseIDs` in the root directory containing sample ID images.

## Dependencies
- jigsawstack: For image upload and OCR processing
- dotenv: For loading environment variables
- fs: For file system operations
- path: For file path manipulations

## File Structure
```
.
├── index.js
├── .env
├── SampleDriversLicenseIDs/
│   ├── id1.jpg
│   ├── id2.png
│   └── ...
├── package.json
└── README.md
```

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
