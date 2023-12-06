const express = require("express");
const app = express();
const SurveyData = require("./shared/SurveyData.js");
let path = require("path");
const { platform } = require("os");
const PORT_NUM = process.env.PORT || 3000;
app.use(express.urlencoded({extended: true}));

const knex = require("knex")({
  client: "pg",
  connection: {
    host: process.env.RDS_HOSTNAME || "awseb-e-h9iqh6mffe-stack-awsebrdsdatabase-dmmrvpxyf7gh.ciiiun5cmpps.us-east-1.rds.amazonaws.com",
    user: process.env.RDS_USERNAME || "ebroot",
    password: process.env.RDS_PASSWORD || "Section4Group9Admin!",
    database: process.env.RDS_DB_NAME || "intex",
    port: process.env.RDS_PORT || 5432,
    ssl: true /*process.env.DB_SSL*/ ? {rejectUnauthorized: false} : false
  }
});

app.get("/index", (req, res) => {
   res.render("index");
});

// Frontend static middleware
app.use(express.static(path.join(__dirname, 'public')));

app.use('/shared', express.static(path.join(__dirname, 'shared')));

app.set("view engine", "ejs");

// app.use((_req, res) => {
//   res.sendFile('index.html', { root: 'public' });
// });

app.use(express.json());

async function getSurveyInfoList(pageNum) {
  // const orgTypeSet = new Set(['University', 'Private', 'Government', 'Organization']);
  // const platformSet = new Set(['Youtube', 'Instagram']);
  // const testSurvey1 = new SurveyData(18, 'M', 'Single', 'University Student', orgTypeSet, true, platformSet, 'Between 1 and 2 hours', 2, 3, 1, 4, 3, 5, 2, 3, 5, 4, 2, 1);
  // const testSurvey2 = new SurveyData();
  // const testSurveys = [testSurvey1, testSurvey2];

  const surveyResults = await knex.select().from("response");

  return surveyResults;
}

app.get('/admin', async (req, res, next) => {

  // const pageNumber = req.body['pageNum'];
  // const pageSize = req.body['pageSize'];

  const surveyResponses = await getSurveyInfoList();

  res.render('responses', {responses: surveyResponses});

  // if (Number.isNaN(pageNumber) || Number.isNaN(pageSize)) {
  //   res.status(400).json({message: 'Page number or page size is invalid'});
  // } else {
    
  // }
});

// API listener middleware
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.post('/createSurvey', async (req, res) => {
  // Validate survey input
  const uploadData = req.body;
  // console.log(uploadData);
  if (uploadData['Age'] && uploadData['Gender'] && uploadData['RelationshipStatus'] && uploadData['OccupationStatus'] && uploadData['OrganizationTypes'] && uploadData['UseSocial']
  && uploadData['SocialMediaPlatforms'] && uploadData['AvgTimePerDay'] && uploadData['Q9'] && uploadData['Q10'] && uploadData['Q11'] && uploadData['Q12'] && uploadData['Q14']
  && uploadData['Q13'] && uploadData['Q14'] && uploadData['Q15'] && uploadData['Q16'] && uploadData['Q17'] && uploadData['Q18'] && uploadData['Q19'] && uploadData['Q20']) {

    uploadData['AssociatedUniversity'] = 'N';
    uploadData['AssociatedCompany'] = 'N';
    uploadData['AssociatedSchool'] = 'N';
    uploadData['AssociatedPrivate'] = 'N';
    uploadData['AssociatedGov'] = 'N';
    uploadData['AssociatedNA'] = 'N';

    for (const orgType of uploadData['OrganizationTypes']) {
      switch (orgType) {
        case 'University':
          uploadData['AssociatedUniversity'] = 'Y';
          break;
        case 'Private':
          uploadData['AssociatedPrivate'] = 'Y';
          break;
        case 'School':
          uploadData['AssociatedSchool'] = 'Y';
          break;
        case 'Government':
          uploadData['AssociatedGov'] = 'Y';
          break;
        case 'Company':
          uploadData['AssociatedCompany'] = 'Y';
          break;
        case 'N/A':
          uploadData['AssociatedNA'] = 'Y';
          break;
        default:
          break;
      }
    }

    switch (uploadData['RelationshipStatus']) {
      case 'single':
        uploadData['RelationshipStatus'] = 'Single';
        break;
      case 'married':
        uploadData['RelationshipStatus'] = 'Married';
        break;
      case 'in-relationship':
        uploadData['RelationshipStatus'] = 'In a relationship';
        break;
      case 'divorced':
        uploadData['RelationshipStatus'] = 'Divorced';
    }


    const socialPlatforms = uploadData['SocialMediaPlatforms'];

    delete uploadData['SocialMediaPlatforms'];
    delete uploadData['OrganizationTypes'];


    let now = new Date().toISOString();
    now = now.substring(0, now.lastIndexOf('.'));
    console.log(now);

    uploadData['Timestamp'] = now;
    uploadData['UseSocial'] = uploadData['UseSocial'] ? 'Y' : 'N';  

    uploadData['Origin'] = 'n/a';
    uploadData['City'] = uploadData['City'] ? uploadData['City'] : 'Provo';

    uploadData['OccupationStatus'] = uploadData['OccupationStatus'].charAt(0).toUpperCase() + uploadData['OccupationStatus'].slice(1);

    const newResponses =  await knex.into('response').insert(uploadData).column('Timestamp', 'Age', 'Gender', 'RelationshipStatus', 'OccupationStatus', 'AssociatedUniversity', 'AssociatedCompany', 'AssociatedSchool', 'AssociatedPrivate', 'AssociatedGov', 'AssociatedNA', 'UseSocial', 'AvgTimePerDay', 'Q9', 'Q10', 'Q11', 'Q12', 'Q13', 'Q14', 'Q15', 'Q16', 'Q17', 'Q18', 'Q19', 'Q20', 'City', 'Origin').returning('ResponseID');

    console.log(newResponses[0]);

    if (socialPlatforms.length > 0 && newResponses[0]) {
      const responsePlatforms = [];

      for (const tempSocial of socialPlatforms) {
        let platformNum = 0;
        switch (tempSocial) {
          case 'Facebook':
            platformNum = 0;
            break;
          case 'Twitter':
            platformNum = 0;
            break;
          case 'Instagram':
            platformNum = 0;
            break;
          case 'YouTube':
            platformNum = 0;
            break;
          case 'Discord':
            platformNum = 0;
            break;
          case 'Reddit':
            platformNum = 0;
            break;
          case 'Pinterest':
            platformNum = 0;
            break;
          case 'TikTok':
            platformNum = 0;
            break;
          case 'Snapchat':
            platformNum = 0;
            break;
          default:
            platformNum = 0;
            break;
        }
        if (platformNum !== 0) {
          responsePlatforms.push({ResponseID: newResponses[0], PlatformID: platformNum});
        }
      }

      if (responsePlatforms.length > 0) {
        await knex.into('responseplatform').insert(responsePlatforms);
      }
    }

    res.status(201).json({message: 'Success'});
  } else {
      res.status(400).json({message: 'Survey is missing data'});
  }
});

app.listen(PORT_NUM, () => console.log(`Server is listening on port ${PORT_NUM}`));
