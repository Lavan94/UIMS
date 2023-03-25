import com.uims.zm.zonemanager.entity.service.Service
import com.uims.zm.zonemanager.entity.service.contract.Contract
import com.uims.zm.zonemanager.entity.service.contract.ServiceContract
import com.uims.zm.zonemanager.entity.service.contract.payment.ContractPayment
import jakarta.persistence.*
import java.util.*

@Entity(name = "ContractPaymentHistory")
@Table(name = "contract_history")
class ContractPaymentHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    open var id: UUID? = null

//    @MapsId
//    @OneToOne(targetEntity = Contract::class)
//    @JoinColumn(name = "contract_id", nullable = true)
//    var contract: Contract? = null
//
//    @OneToMany(
//        targetEntity = ContractPayment::class,
//        mappedBy = "contractPaymentHistory",
//        cascade = [CascadeType.ALL],
//        fetch = FetchType.LAZY
//    )
//    var contractPaymentList: List<ContractPayment>? = null;
//
//    @ManyToOne(targetEntity = ServiceContract::class)
//    @JoinColumn(name = "service_contract_id", referencedColumnName = "id")
//    open var serviceContract: ServiceContract? = null
}