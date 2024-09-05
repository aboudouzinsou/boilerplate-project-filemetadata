var express = require('express');
var cors = require('cors');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

const upload = multer();

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const file = req.file;
  if (!file) {
      return res.json({ error: 'No file uploaded' });
  }

  const fileMetadata = {
      name: file.originalname,
      type: file.mimetype,
      size: file.size
  };

  // Rediriger vers la route /api/fileanalyse avec les métadonnées du fichier
  res.redirect(`/api/fileanalyse?name=${fileMetadata.name}&type=${fileMetadata.type}&size=${fileMetadata.size}`);
});

app.get('/api/fileanalyse', (req, res) => {
  const { name, type, size } = req.query;
  res.json({
      name,
      type,
      size: parseInt(size)
  });
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
