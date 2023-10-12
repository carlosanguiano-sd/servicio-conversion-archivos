/**
 * ConvertController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

'use strict';

const path = require('path');
const fs = require('fs').promises;

const libre = require('libreoffice-convert');
libre.convertAsync = require('util').promisify(libre.convert);

module.exports = {
  
	/**
	 * `ConvertController.ConvertFile()`
	 */
	ConvertFile: async function(req, res)
	{
        const ext = '.pdf'
        const inputPath = 'resume.docx';
        const outputPath = `example${ext}`;
    
        // Read file
        const docxBuf = await fs.readFile(inputPath);
    
        // Convert it to pdf format with undefined filter (see Libreoffice docs about filter)
        let pdfBuf = await libre.convertAsync(docxBuf, ext, undefined);
        
        // Here in done you have pdf file which you can save or transfer in another stream
        await fs.writeFile(outputPath, pdfBuf);

        return res.ok();
    }
};

