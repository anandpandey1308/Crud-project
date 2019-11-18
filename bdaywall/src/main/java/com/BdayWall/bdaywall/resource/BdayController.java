package com.BdayWall.bdaywall.resource;


import com.BdayWall.bdaywall.config.MongoConfig;
import com.BdayWall.bdaywall.model.Bday;
import com.BdayWall.bdaywall.model.Bdaylist;
import com.BdayWall.bdaywall.repository.BdayRepository;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.mongodb.*;
import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.GridFSFindIterable;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import com.mongodb.gridfs.GridFS;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.client.gridfs.model.GridFSFile;
import com.mongodb.gridfs.GridFSDBFile;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.awt.image.BufferedImage;
import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.springframework.data.mongodb.core.query.Query.query;
import static org.springframework.data.mongodb.gridfs.GridFsCriteria.whereMetaData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.io.IOException;

import com.mongodb.client.gridfs.model.GridFSFile;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mongodb.gridfs.GridFSDBFile;

import static org.springframework.data.mongodb.core.query.Query.query;
import static org.springframework.data.mongodb.gridfs.GridFsCriteria.whereMetaData;

import com.mongodb.gridfs.GridFSDBFile;


import javax.imageio.ImageIO;

@RestController
public class BdayController {

    @Autowired
    GridFsOperations gridFsOperations;



    private MongoTemplate mongoTemplate;
    private GridFsTemplate gridFsTemplate;
    GridFSBucket gridFSBucket;
    DB db;
    String firstname;
    String lastname;
    String birthday;
    String filename;
    String teamname;
    String firstname1;
    String lastname1;
    String teamname1;
    String day;
    String months;

    @Value("${app.imageDirctory}")
    String imageDirectoryPath;
    {
        System.out.println("image path is" + imageDirectoryPath);
    }

    @Autowired
    private BdayRepository repository;

    List list = new ArrayList();

    private MongoConfig mongoConfig;


    private GridFS gridFS;

    String fileid = "";

    /**
     * A POST request to add user input into the database.
     * Using repository save method.
     *
     * @return a string which tells that the bday was successfully added.
     */
    @CrossOrigin(origins = "*",allowedHeaders ="*")
    @PostMapping(path = "/addYourBday", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String savebday(@RequestParam(value="file", required=false) MultipartFile file, @ModelAttribute Bday bday) throws IOException, FileNotFoundException {

        System.out.println(bday.getFirstname());
        //MultipartFile file = optFile.get();
        //If file is null, take default image form the folder, else take the image provided by the user.
        //If file is null, take the default image and rename is to Associate ID.jpg.
        if(file==null) {
        	
        }
        DBObject metaData = new BasicDBObject();
        metaData.put("firstname", bday.getFirstname());
        metaData.put("lastname", bday.getLastname());
        metaData.put("teamname", bday.getTeamname());
        metaData.put("associd", bday.getAssocid());
        metaData.put("day", bday.getDay());
        metaData.put("months", bday.getMonths());
        metaData.put("year", bday.getYear());
        metaData.put("filename",file.getOriginalFilename());
        
        
         File f = new File(imageDirectoryPath);
        
        System.out.println("Absolute path is " + f.getAbsolutePath());
        if(f.isDirectory()){
            System.out.println("The path directory");
        }
        File fileToSave = new File(imageDirectoryPath + File.separator+ file.getOriginalFilename());
        System.out.println("Image file Absolute path is " + fileToSave.getAbsolutePath());

        //copy file content from received file to new local file
        file.transferTo(fileToSave);
        InputStream inputStream = new FileInputStream(fileToSave);
        metaData.put("type", "image");
        fileid = gridFsOperations.store(inputStream, file.getOriginalFilename(), metaData).toString();

        return "Successfully added your birthday!";
    }



    @CrossOrigin(origins = "*",allowedHeaders ="*")
    @GetMapping(value = "/todaysBday/{day}/{months}")
    public List<Object> getByDayAndMonths(@PathVariable("day") Integer day, @PathVariable("months") String months) throws IOException {
        GridFSFindIterable imageFile = gridFsOperations.find(query(whereMetaData("day").is(day).andOperator(Criteria.where("metadata.months").is(months))));
        List<Object> bday = new ArrayList<Object>();

        imageFile.forEach(new Block<GridFSFile>() {
            @Override
            public void apply(GridFSFile gridFSFile) {
               // birthday=gridFSFile.getMetadata().toJson();

                Bdaylist blist=new Bdaylist();
                firstname=gridFSFile.getMetadata().get("firstname").toString();
                lastname=gridFSFile.getMetadata().get("lastname").toString();
                teamname=gridFSFile.getMetadata().get("teamname").toString();

                System.out.println(teamname);
                firstname1=firstname.toUpperCase();
                lastname1=lastname.toUpperCase();
                teamname1=teamname.toUpperCase();

                filename=gridFSFile.getFilename();
                blist.setFilename(filename);
                blist.setFirstname(firstname1);
                blist.setLastname(lastname1);
                blist.setTeamname(teamname1);
               // bday.add(firstname);
                //bday.add(lastname);
                //bday.add(filename);
                bday.add(blist);
            }
        });
        return bday;

    }

    @CrossOrigin(origins =  "*",allowedHeaders ="*")
    @GetMapping(value = "/unique/{associd}")
    public String getByAssocid(@PathVariable("associd") String associd) throws NullPointerException {
        try {
            GridFSFile File = gridFsOperations.findOne(query(whereMetaData("associd").is(associd)));
            Boolean c = File.equals("");
            System.out.println(File);
            String id1 = File.getMetadata().get("associd").toString();
            System.out.println(associd.getClass());
            System.out.println(id1.getClass());
            Boolean b = id1.equals(associd);
            System.out.println(b);
            return "true";
        } catch (NullPointerException e)
        {
            System.out.print("false");
            return "false";


        }


    }
}

