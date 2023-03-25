
import com.uims.zm.zonemanager.entity.service.Service
import com.uims.zm.zonemanager.entity.service.contract.Contract
import com.uims.zm.zonemanager.entity.service.contract.payment.ContractPayment
import jakarta.persistence.*
import java.util.*

@Entity
@Table(name = "contract_history")
open class ContractPaymentHistory<T> where T : Service {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    open var id: UUID? = null

    @MapsId
    @OneToOne(targetEntity = Contract::class)
    @JoinColumn(name = "contract_id", nullable = true)
    var contract: Contract? = null

    @OneToMany(targetEntity = ContractPayment::class)
    var contractHistory: List<ContractPayment<T>>? = null
}