package com.uims.zm.zonemanager.organization.service

import com.uims.zm.zonemanager.entity.organization_zone.OrganizationZoneType
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.core.io.ClassPathResource
import org.springframework.core.io.ResourceLoader
import org.springframework.stereotype.Service
import java.io.File
import java.io.FileNotFoundException
import java.io.FileWriter
import java.util.*


@Service
class OrganizationGeoJsonService {
    private val GEO_JSON_FOLDER = "/organization-geo-json"
    private val SECTOR_FOLDER = GEO_JSON_FOLDER + "/sector/"
    private val NEIGHBORHOOD_FOLDER = GEO_JSON_FOLDER + "/neighborhood/"
    private val COMPLEX_FOLDER = GEO_JSON_FOLDER + "/complex/"
    private val URBAN_ZONE_FOLDER = GEO_JSON_FOLDER + "/urban-zone/"

    @Autowired
    var resourceLoader: ResourceLoader? = null

    private fun loadGeoJsonFolder(path: String): File {
        try{
            return ClassPathResource(path).file
        } catch (e: FileNotFoundException){
            val file = File(ClassPathResource(".").file.absolutePath + path)
            file.mkdirs()
            return file
        }
    }

    fun writeGeoJsonDataByRole(organizationType: OrganizationZoneType, orgName: String, geoJson: String): String {
        val folder: File = this.loadGeoJsonFolder(
            when (organizationType) {
                OrganizationZoneType.SECTOR -> SECTOR_FOLDER
                OrganizationZoneType.NEIGHBORHOOD -> NEIGHBORHOOD_FOLDER
                OrganizationZoneType.COMPLEX -> COMPLEX_FOLDER
                OrganizationZoneType.URBAN_ZONE -> URBAN_ZONE_FOLDER
            })

        val file = File(folder.absolutePath.toString() + "/" + orgName + UUID.randomUUID() + ".txt")
        val fileWriter = FileWriter(file)
        fileWriter.write(geoJson)
        fileWriter.close()
        return file.absolutePath
    }

    fun getFileContent(filePath: String): String{
        var fileContent: String = ""
        val scanner = Scanner(File(filePath))
        while (scanner.hasNextLine()) fileContent += scanner.nextLine()
        return fileContent
    }

    fun deleteOldGeoJsonFile(oldGeoJsonFilePath: String): Boolean {
        return File(oldGeoJsonFilePath).delete()
    }
}