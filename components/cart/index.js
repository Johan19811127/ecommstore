import styles from './styles.module.scss'

export default function CartDetail({citem}) {
  return (
    <div>
      <div className="row border border-secondary-subtle p-2">
        <div className="col-3 col-lg-2 py-2 px-3 border-end border-secondary-subtle">
          <img src={citem.img} alt={citem.name}></img>

        </div>
        <div className="col-7 col-lg-8 border-end px-3 pt-2">
          <div className={styles.namediv}>
          <h4 className={styles.item_name}>{citem.name}</h4>
      
          </div>
          <p className="text-center ">Additional Information about the</p>

        </div>
      </div>
    </div>
  )
}
