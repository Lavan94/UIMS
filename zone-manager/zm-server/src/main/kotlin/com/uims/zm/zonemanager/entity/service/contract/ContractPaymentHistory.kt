import jakarta.persistence.*
import java.util.*

@Entity
@Table(name = "contract_payment_history")
class ContractPaymentHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    open var id: UUID? = null

}