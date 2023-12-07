const express = require("express");
const app = express();
const SurveyData = require("./shared/SurveyData.js");
let path = require("path");
const PORT_NUM = process.env.PORT || 3000;
app.use(express.urlencoded({extended: true}));
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');


app.use(cookieParser());

const knex = require("knex")({
  client: "pg",
  connection: {
    host: process.env.RDS_HOSTNAME || "awseb-e-h9iqh6mffe-stack-awsebrdsdatabase-dmmrvpxyf7gh.ciiiun5cmpps.us-east-1.rds.amazonaws.com",
    user: process.env.RDS_USERNAME || "ebroot",
    password: process.env.RDS_PASSWORD || "Section4Group9Admin!",
    database: "intex",
    port: process.env.RDS_PORT || 5432,
    ssl: true ? {rejectUnauthorized: false} : false
  }
});


app.get("/index", (req, res) => {
   res.render("index");
});

app.get("/submitted", (req, res) => {
  res.render("submitted");
});

// Frontend static middleware
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use('/shared', express.static(path.join(__dirname, 'shared')));

app.use('/admin', checkAuth);

app.set("view engine", "ejs");

// app.use((_req, res) => {
//   res.sendFile('index.html', { root: 'public' });
// });

app.use(express.json());

async function getSurveyInfoList(pageNum) {
  const surveyResults = await knex.raw('SELECT DISTINCT r1."ResponseID", r1."Timestamp", r1."Age", r1."Gender", r1."RelationshipStatus",\
  r1."OccupationStatus", r1."UseSocial", r1."AvgTimePerDay", r1."AssociatedUniversity", r1."AssociatedCompany", r1."AssociatedSchool",\
  r1."AssociatedPrivate", r1."AssociatedGov", r1."AssociatedNA", r1."Q9", r1."Q9", r1."Q10", r1."Q11", r1."Q12", r1."Q13", r1."Q14", r1."Q15",\
  r1."Q16", r1."Q17", r1."Q18", r1."Q19", r1."Q20", (SELECT string_agg(p2."PlatformName", \', \') FROM responseplatform rp2\
  INNER JOIN platform p2 ON rp2."PlatformID" = p2."PlatformID"\
  WHERE rp2."ResponseID" = r1."ResponseID") AS "SocialMediaPlatforms"\
  FROM response r1 \
  ORDER BY r1."ResponseID" ASC;');

  return surveyResults.rows;
}

app.get("/admin", async (req, res) => {
  const results = await getSurveyInfoList();

  for (const tempRow of results) {
    rowSetAssociatedOrganizations(tempRow);
  }

  knex.select().from("authtoken").then(userInfo => {
    res.render("responses", {responses: results, users: userInfo});
  });
});

app.get("/", (req, res) => {
  res.render("index");
})

app.get("/survey", (req, res) => {
  res.render("survey");
})

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
})

app.get("/login", (req, res) => {
  res.render("login");
})

// API listener middleware
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.post('/createSurvey', async (req, res) => {
  // Validate survey input
  const uploadData = req.body;
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

    uploadData['Timestamp'] = now;
    uploadData['UseSocial'] = uploadData['UseSocial'] ? 'Y' : 'N';  

    uploadData['City'] = uploadData['City'] ? uploadData['City'] : 'Provo';

    uploadData['OccupationStatus'] = uploadData['OccupationStatus'].charAt(0).toUpperCase() + uploadData['OccupationStatus'].slice(1);

    uploadData['Origin'] = uploadData['Origin'] ? uploadData['Origin'] : 'n/a';

    const newResponses =  await knex.into('response').insert(uploadData).column('Timestamp', 'Age', 'Gender', 'RelationshipStatus', 'OccupationStatus', 'AssociatedUniversity', 'AssociatedCompany', 'AssociatedSchool', 'AssociatedPrivate', 'AssociatedGov', 'AssociatedNA', 'UseSocial', 'AvgTimePerDay', 'Q9', 'Q10', 'Q11', 'Q12', 'Q13', 'Q14', 'Q15', 'Q16', 'Q17', 'Q18', 'Q19', 'Q20', 'City', 'Origin').returning('ResponseID');

    if (socialPlatforms.length > 0 && newResponses[0]) {
      const responsePlatforms = [];

      for (const tempSocial of socialPlatforms) {
        let platformNum = 0;
        switch (tempSocial) {
          case 'Facebook':
            platformNum = 1;
            break;
          case 'Twitter':
            platformNum = 2;
            break;
          case 'Instagram':
            platformNum = 3;
            break;
          case 'YouTube':
            platformNum = 4;
            break;
          case 'Discord':
            platformNum = 5;
            break;
          case 'Reddit':
            platformNum = 6;
            break;
          case 'Pinterest':
            platformNum = 7;
            break;
          case 'TikTok':
            platformNum = 8;
            break;
          case 'Snapchat':
            platformNum = 9;
            break;
          default:
            platformNum = 0;
            break;
        }
        if (platformNum !== 0) {
          responsePlatforms.push({ PlatformID: platformNum, ResponseID: newResponses[0]['ResponseID']});
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

// Check user login auth middleware
async function checkAuth (req, res, next) {
  try {
    authToken = req.cookies['token'];
    const user = await getUserByToken(authToken);
    if (user) {
      next();
    } else {
      res.status(401).send({ msg: 'Unauthorized' });
    }
  } catch (error) {
    res.status(401).send({ msg: 'Unauthorized' });
  }
}

apiRouter.post('/login', async (req, res) => {
  const user = await getUser(req.body.username);
  if (user) {
    try {
      if (await bcrypt.compare(req.body.password, user.Password)) {
        setAuthCookie(res, user.AuthToken);
        res.send({ username: user.Username });
        return;
      }
    } catch (error) {
      res.status(401).send({ message: 'Invalid password'});
      return;
    } 
  }
  res.status(401).send({ message: 'Invalid username or password' });
});

const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use('/api/auth', checkAuth);

async function getUserByToken(authToken) {
  const resultUser = await knex('authtoken').select().where('AuthToken', authToken);
  return resultUser[0];
}

function setAuthCookie(res, authToken) {
  res.cookie('token', authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
    path: '/'
  });
}

async function getUser(username) {
  const userResult = await knex('authtoken').select().where('Username', username);

  return userResult[0];
}

async function createUser(username, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    Username: username,
    Password: passwordHash,
    AuthToken: uuid.v4(),
  };

  await knex.into('authtoken').insert(user);

  return user;
}

async function searchResponses(textInput, searchType) {
  try {
    if (searchType === 'responseIdSearch') {
      const numberInput = parseInt(textInput);
        const answer = await knex('response as r1').select('r1.*', knex.raw(`
        (SELECT string_agg(p2."PlatformName", ', ') 
         FROM responseplatform rp2 
         INNER JOIN platform p2 ON rp2."PlatformID" = p2."PlatformID" 
         WHERE rp2."ResponseID" = r1."ResponseID"
        ) AS "SocialMediaPlatforms"
      `)).where('ResponseID', numberInput);
        return answer;
    } else {
      if (!Number.isNaN(parseInt(textInput))) {
        const numberInput = parseInt(textInput);
        const answer = await knex('response as r1')
        .select('r1.*', knex.raw(`
        (SELECT string_agg(p2."PlatformName", ', ') 
         FROM responseplatform rp2 
         INNER JOIN platform p2 ON rp2."PlatformID" = p2."PlatformID" 
         WHERE rp2."ResponseID" = r1."ResponseID"
        ) AS "SocialMediaPlatforms"
      `))
        .where('Age', numberInput)
        .orWhere(knex.raw('"AvgTimePerDay" LIKE ?', [`%${textInput}%`]));
        return answer;
      } else {
        const likeInput = `%${textInput}%`;
        const answer = await knex.raw('SELECT DISTINCT r1."ResponseID", r1."Timestamp", r1."Age", r1."Gender", r1."RelationshipStatus",\
        r1."OccupationStatus", r1."UseSocial", r1."AvgTimePerDay", r1."AssociatedUniversity", r1."AssociatedCompany", r1."AssociatedSchool",\
        r1."AssociatedPrivate", r1."AssociatedGov", r1."AssociatedNA", r1."Q9", r1."Q9", r1."Q10", r1."Q11", r1."Q12", r1."Q13", r1."Q14", r1."Q15",\
        r1."Q16", r1."Q17", r1."Q18", r1."Q19", r1."Q20", (SELECT string_agg(p2."PlatformName", \', \') FROM responseplatform rp2\
        INNER JOIN platform p2 ON rp2."PlatformID" = p2."PlatformID"\
        WHERE rp2."ResponseID" = r1."ResponseID") AS "SocialMediaPlatforms"\
        FROM response r1 INNER JOIN responseplatform rp1 ON r1."ResponseID" = rp1."ResponseID"\
        INNER JOIN platform p1 ON rp1."PlatformID" = p1."PlatformID"\
        WHERE r1."Gender" LIKE ? OR r1."RelationshipStatus" LIKE ? OR r1."OccupationStatus" LIKE ? OR r1."AvgTimePerDay" LIKE ? OR r1."City" LIKE ? OR r1."Origin" LIKE ?\
        OR (p1."PlatformName" LIKE ? \
        AND p1."PlatformName" IN (SELECT p2."PlatformName" FROM responseplatform rp2 INNER JOIN platform p2 ON rp2."PlatformID" = p2."PlatformID" WHERE rp2."ResponseID" = r1."ResponseID"))\
        ORDER BY r1."ResponseID" ASC;', 
        [likeInput, likeInput, likeInput, likeInput, likeInput, likeInput, likeInput]);
      
        return answer.rows;
      }
    }
  } catch (error) {
    console.log(`query failed. error: ${error}`);
    return [];
  }
} 

function checkAssociatedColumn(rowResult, columnName, deleteColumn) {
  if (rowResult[columnName] && rowResult[columnName] === 'Y') {
    if (deleteColumn === true) {
      delete rowResult[columnName];
    }
    return true;
  } else {
    if (deleteColumn === true) {
      delete rowResult[columnName];
    }
    return false;
  }
}

function rowSetAssociatedOrganizations(tempRow) {
  const occupationArr = [];
      tempRow['Occupations'] = '';
      if (checkAssociatedColumn(tempRow, 'AssociatedUniversity', true)) {
        occupationArr.push('University');
      }

      if (checkAssociatedColumn(tempRow, 'AssociatedCompany', true)) {
        occupationArr.push('Company');
      }

      if (checkAssociatedColumn(tempRow, 'AssociatedSchool', true)) {
        occupationArr.push('School');
      }

      if (checkAssociatedColumn(tempRow, 'AssociatedPrivate', true)) {
        occupationArr.push('Private');
      }

      if (checkAssociatedColumn(tempRow, 'AssociatedGov', true)) {
        occupationArr.push('Government');
      }

      if (checkAssociatedColumn(tempRow, 'AssociatedNA', true)) {
        occupationArr.push('N/A');
      }

      if (occupationArr.length > 0) {
        tempRow['Occupations'] = occupationArr.join(', ');
      } else {
        tempRow['Occupations'] = 'None';
      }
}

app.get('/admin/searchResponses', async (req, res) => {
  const searchText = req.query.searchText;
  if (searchText) {
    const matchedRows = await searchResponses(searchText, req.query.searchType);

    for (const tempRow of matchedRows) {
      rowSetAssociatedOrganizations(tempRow);
    }

    knex.select().from("authtoken").then(userInfo => {
      res.render('responses', {responses: matchedRows, users: userInfo});
    });
  } else {
    const results = await getSurveyInfoList();

    for (const tempRow of results) {
      rowSetAssociatedOrganizations(tempRow);
    }

    knex.select().from("authtoken").then(userInfo => {
      res.render('responses', {responses: results, users: userInfo});
    });
  }
});

apiRouter.post('/auth/create', async (req, res) => {
  if (await getUser(req.body.username)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.username, req.body.password);
    res.send({
      username: user.Username,
    });
  }
});

apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie('token');
  res.status(204).end();
});

app.get('/user/me', async (req, res) => {
  const authToken = req.cookies['token'];
  const user = getUserByToken(authToken);
  if (user[0]) {
    res.send({ username: user[0].Username });
    return;
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

apiRouter.post("/auth/deleteUser", async (req, res) => { 
  await knex("authtoken").where("Username", req.body['username']).del()
  res.status(200)
});

apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie('token');
  res.status(204).end();
});

app.listen(PORT_NUM, () => console.log(`Server is listening on port ${PORT_NUM}`));
