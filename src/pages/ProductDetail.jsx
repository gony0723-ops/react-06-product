import { useParams } from "react-router";
import { useEffect, useState } from "react";
import styles from "./styles/ProductDetail.module.scss";

function ProductDetail() {
    // 사용자가 "저 상품 상세 내용을 보고 싶어"를 요청한 상황
    // 백엔드에게 "저 상품"의 상세 내용을 받아와 함
    // "저 상품" 예를 들어 4번 상품이라고 한 정보는 "경로"에 있음

    const {id} = useParams(); // 경로상 동적 라우팅의 값을 react-router가 갖고 있고 그 정보를 받아와야 함

    // 4라는, 사용자가 원하는 상품 번호를 알아왔으니까
    // 백엔드에게 4번 상품 정보를 요청, 가공, 저장
    // 화면에 출력
    
    const [product, setProducts] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then(res => res.json())
            .then(json => setProducts(json))
            .catch(err => console.log(err))
            // .finally(함수) 메서드는 메서드 체인을 통해
            // then을 통해 성공 시나리오든, catch를 통한 실패 시나리오든
            // 상관 없이 마지막에 실행되어야 하는 내용을 기록
            .finally(() => setLoading(false));
    }, []);

    // 초기 렌더링에는 loading이 true이므로, 이 아래 if가 출력
    if(loading) {
        return <div className={styles.loading}>Loading...</div>
    }

    // useEffect가 발동해서 fetch가 실행되는데
    // 정상적으로 데이터를 받아오든, 받아오지 못하든 loading은 false가 됨
    // 이 아래로 내려오는데 실패되면 product state는 갱신되지 못하고 null로 남아있음
    if (!product) {
        return <div className={styles.empty}>상품을 찾을 수 없습니다</div>
    }

    return (
        <div className={styles.container}>
            <Link to={"/"} className={styles.backBtn}>
                &arr; 목록으로
            </Link>
            <div className={styles.content}>
                <img src={product.thumbnail} alt={product.title} className={styles.image} />
                <div className={styles.info}>
                    <h1 className={styles.title}>{product.title}</h1>
                    <p className={styles.description}>{product.description}</p>
                    <ul className={styles.meta}>
                        <li>
                            <span className={styles.badge}>{product.category}</span>
                        </li>
                        <li>평점: {product.rating}</li>
                        <li className={styles.price}>$ {product.price}</li>
                    </ul>
                </div>
            </div>
        </div>
    )

    // loading도 false이고, product도 있는 상황
    return <></>;
}

export default ProductDetail;