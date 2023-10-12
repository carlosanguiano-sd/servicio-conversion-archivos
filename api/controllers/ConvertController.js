/**
 * ConvertController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

'use strict';

const path = require('path');
const fs = require('fs').promises;
const mime = require('mime');

const libre = require('libreoffice-convert');
libre.convertAsync = require('util').promisify(libre.convert);

module.exports = {
  
	/**
	 * `ConvertController.ConvertFile()`
	 */
	ConvertFile: async function(req, res)
	{
        await req.file('documento').upload(async function (err, uploadedFiles)
        {
            try
            {
                const inputFileBuffer = await fs.readFile(uploadedFiles[0].fd);
                
                const outputFileBuffer = await libre.convertAsync(inputFileBuffer, ".pdf", undefined);

                const outputFileBase64 = Buffer.from(outputFileBuffer).toString('base64');

                return res.ok({file: `data:application/pdf;base64,${outputFileBase64}`});
            }
            catch(err)
            {
                var er = JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err)));
                                
                return res.serverError(er);
            }
        });
    }
};

