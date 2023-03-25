import com.uims.zm.zonemanager.entity.service.WaterService
import com.uims.zm.zonemanager.entity.service.contract.payment.ContractPayment
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Table

@Entity
@Table(name = "water_payment")
class WaterPayment : ContractPayment<WaterService>() {
    @Column(name = "hot_water_consumption", nullable = false)
    var hotWaterConsumption: Double = 0.0

    @Column(name = "cold_water_consumption", nullable = false)
    var coldWaterConsumption: Double = 0.0
}