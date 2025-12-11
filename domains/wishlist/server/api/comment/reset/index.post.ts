import { commentRepo } from '~/domains/comment/infrastructure/commentStorage'
import type { IComment } from "~/domains/comment/types/commentTypes";

export default defineEventHandler(async () => {
    const resetComments: IComment[] =  [
        {
          "id": "qr-WdEIa31f4T_iJ2LYy3",
          "username": "John Smith",
          "text": "Great product, definitely recommend!",
          "product_id": "prod_nike_tshirt_classic_001",
          "rating": 4
        },
        {
          "id": "2XJ4l74lzX2TipF5086ME",
          "username": "Emily Johnson",
          "text": "Very satisfied, quality product and fast delivery.",
          "product_id": "prod_nike_tshirt_classic_001",
          "rating": 5
        },
        {
          "id": "WeOvycFDoQX99xZyC0XRR",
          "username": "Michael Brown",
          "text": "Good product but the price is a bit high.",
          "product_id": "prod_nike_tshirt_classic_001",
          "rating": 3
        },
        {
          "id": "kFdc-YL-PO5ZAwRTnwaMG",
          "username": "Sarah Williams",
          "text": "Excellent quality, exceeded my expectations!",
          "product_id": "prod_nike_tshirt_classic_001",
          "rating": 5
        },
        {
          "id": "mZNRWJ2DXjMI1E_wBKQBI",
          "username": "David Jones",
          "text": "Nice product, thinking of buying again.",
          "product_id": "prod_nike_tshirt_classic_001",
          "rating": 4
        },
        {
          "id": "Yin8R6LXKh0HGEojkH4aV",
          "username": "Jessica Davis",
          "text": "Great product, definitely recommend!",
          "product_id": "prod_apple_iphone_15_001",
          "rating": 4
        },
        {
          "id": "eI-cdD3KCIyd2rPT3QSRU",
          "username": "Christopher Miller",
          "text": "Very satisfied, quality product and fast delivery.",
          "product_id": "prod_apple_iphone_15_001",
          "rating": 5
        },
        {
          "id": "OkfnyRNVdXzygxR36R-iz",
          "username": "Amanda Wilson",
          "text": "Good product but the price is a bit high.",
          "product_id": "prod_apple_iphone_15_001",
          "rating": 3
        },
        {
          "id": "jB6lsPwCRZipM1GtNvu3m",
          "username": "James Moore",
          "text": "Excellent quality, exceeded my expectations!",
          "product_id": "prod_apple_iphone_15_001",
          "rating": 5
        },
        {
          "id": "megh5HHu4K0rDto3utBDF",
          "username": "Lisa Anderson",
          "text": "Nice product, thinking of buying again.",
          "product_id": "prod_apple_iphone_15_001",
          "rating": 4
        },
        {
          "id": "cBcwoI4h43JG-Cp3KhF3N",
          "username": "Robert Taylor",
          "text": "Great product, definitely recommend!",
          "product_id": "prod_lg_refrigerator_001",
          "rating": 4
        },
        {
          "id": "ERVs2--vu9A8LzOl_TmuV",
          "username": "Jennifer Thomas",
          "text": "Very satisfied, quality product and fast delivery.",
          "product_id": "prod_lg_refrigerator_001",
          "rating": 5
        },
        {
          "id": "-CjMhyU6Fbn3a2TxLHXkA",
          "username": "William Jackson",
          "text": "Good product but the price is a bit high.",
          "product_id": "prod_lg_refrigerator_001",
          "rating": 3
        },
        {
          "id": "J5k6zqZj3-p0p1gLwTaii",
          "username": "Michelle White",
          "text": "Excellent quality, exceeded my expectations!",
          "product_id": "prod_lg_refrigerator_001",
          "rating": 5
        },
        {
          "id": "vLCQG16g8hyI4iy4sHnfO",
          "username": "Daniel Harris",
          "text": "Nice product, thinking of buying again.",
          "product_id": "prod_lg_refrigerator_001",
          "rating": 4
        },
        {
          "id": "W1Qming8fqA2E_5fkVcqF",
          "username": "Nicole Martin",
          "text": "Great product, definitely recommend!",
          "product_id": "prod_northface_jacket_001",
          "rating": 4
        },
        {
          "id": "UXRUHi5ANo18plh5C9wQ7",
          "username": "Matthew Thompson",
          "text": "Very satisfied, quality product and fast delivery.",
          "product_id": "prod_northface_jacket_001",
          "rating": 5
        },
        {
          "id": "9RN8X27WYSqQ2rfPxB1Uo",
          "username": "Stephanie Garcia",
          "text": "Good product but the price is a bit high.",
          "product_id": "prod_northface_jacket_001",
          "rating": 3
        },
        {
          "id": "vaZfujOlSBvRZwgvN8Vyq",
          "username": "Andrew Martinez",
          "text": "Excellent quality, exceeded my expectations!",
          "product_id": "prod_northface_jacket_001",
          "rating": 5
        },
        {
          "id": "6tKjfvZMz_AEcbSMHtY8P",
          "username": "Rachel Robinson",
          "text": "Nice product, thinking of buying again.",
          "product_id": "prod_northface_jacket_001",
          "rating": 4
        },
        {
          "id": "vcOFQuVs9bhRD2hrnMfjk",
          "username": "John Smith",
          "text": "Great product, definitely recommend!",
          "product_id": "prod_samsung_galaxy_001",
          "rating": 4
        },
        {
          "id": "JyVuXgmqvjr9S9HcQwV5D",
          "username": "Emily Johnson",
          "text": "Very satisfied, quality product and fast delivery.",
          "product_id": "prod_samsung_galaxy_001",
          "rating": 5
        },
        {
          "id": "18YaHyk5XH0V9dFFdDXOV",
          "username": "Michael Brown",
          "text": "Good product but the price is a bit high.",
          "product_id": "prod_samsung_galaxy_001",
          "rating": 3
        },
        {
          "id": "VyrisXwiHrmXydL3yvBMx",
          "username": "Sarah Williams",
          "text": "Excellent quality, exceeded my expectations!",
          "product_id": "prod_samsung_galaxy_001",
          "rating": 5
        },
        {
          "id": "XCfwQvBRP-0axbVbdvfdP",
          "username": "David Jones",
          "text": "Nice product, thinking of buying again.",
          "product_id": "prod_samsung_galaxy_001",
          "rating": 4
        },
        {
          "id": "7L6GYz8QFeUo7KQLlMFb3",
          "username": "Jessica Davis",
          "text": "Great product, definitely recommend!",
          "product_id": "prod_adidas_sneakers_001",
          "rating": 4
        },
        {
          "id": "xmjIXj51HL9yPXPGJ1uUE",
          "username": "Christopher Miller",
          "text": "Very satisfied, quality product and fast delivery.",
          "product_id": "prod_adidas_sneakers_001",
          "rating": 5
        },
        {
          "id": "GpY-oKvcLMN1p9Jb4zyet",
          "username": "Amanda Wilson",
          "text": "Good product but the price is a bit high.",
          "product_id": "prod_adidas_sneakers_001",
          "rating": 3
        },
        {
          "id": "J9LLQ45dCN5YrSG_SpC_5",
          "username": "James Moore",
          "text": "Excellent quality, exceeded my expectations!",
          "product_id": "prod_adidas_sneakers_001",
          "rating": 5
        },
        {
          "id": "XBrplu-orltjYoSBQrCnI",
          "username": "Lisa Anderson",
          "text": "Nice product, thinking of buying again.",
          "product_id": "prod_adidas_sneakers_001",
          "rating": 4
        },
        {
          "id": "VAlydbryv-QOUxMlEmsJ7",
          "username": "Robert Taylor",
          "text": "Great product, definitely recommend!",
          "product_id": "prod_ikea_sofa_001",
          "rating": 4
        },
        {
          "id": "G1yz2wqpROK-EQJcEhO4y",
          "username": "Jennifer Thomas",
          "text": "Very satisfied, quality product and fast delivery.",
          "product_id": "prod_ikea_sofa_001",
          "rating": 5
        },
        {
          "id": "LZrrex-92Ap3uCLe5hfvq",
          "username": "William Jackson",
          "text": "Good product but the price is a bit high.",
          "product_id": "prod_ikea_sofa_001",
          "rating": 3
        },
        {
          "id": "PizchxaYE6HMZinbHTk8P",
          "username": "Michelle White",
          "text": "Excellent quality, exceeded my expectations!",
          "product_id": "prod_ikea_sofa_001",
          "rating": 5
        },
        {
          "id": "fJHT2wlN0f6hH47s_UPtu",
          "username": "Daniel Harris",
          "text": "Nice product, thinking of buying again.",
          "product_id": "prod_ikea_sofa_001",
          "rating": 4
        },
        {
          "id": "Qkq5_BOew8DufudErjENm",
          "username": "Nicole Martin",
          "text": "Great product, definitely recommend!",
          "product_id": "prod_loreal_shampoo_001",
          "rating": 4
        },
        {
          "id": "8jAmD9PfIw4hqAKVdwcDL",
          "username": "Matthew Thompson",
          "text": "Very satisfied, quality product and fast delivery.",
          "product_id": "prod_loreal_shampoo_001",
          "rating": 5
        },
        {
          "id": "JLWWNAEsBayygJqXBPSNu",
          "username": "Stephanie Garcia",
          "text": "Good product but the price is a bit high.",
          "product_id": "prod_loreal_shampoo_001",
          "rating": 3
        },
        {
          "id": "IQBA2wOUPYoD3pWx4jwmM",
          "username": "Andrew Martinez",
          "text": "Excellent quality, exceeded my expectations!",
          "product_id": "prod_loreal_shampoo_001",
          "rating": 5
        },
        {
          "id": "eLfUU9SRkpSyrAwoNneEN",
          "username": "Rachel Robinson",
          "text": "Nice product, thinking of buying again.",
          "product_id": "prod_loreal_shampoo_001",
          "rating": 4
        },
        {
          "id": "Qit8wcDirVyz6mUDOFha9",
          "username": "John Smith",
          "text": "Great product, definitely recommend!",
          "product_id": "prod_bosch_drill_001",
          "rating": 4
        },
        {
          "id": "2wR39ysoQ7AVpY8PVXqow",
          "username": "Emily Johnson",
          "text": "Very satisfied, quality product and fast delivery.",
          "product_id": "prod_bosch_drill_001",
          "rating": 5
        },
        {
          "id": "Z5XlEqg_Gin44g2WaUMMz",
          "username": "Michael Brown",
          "text": "Good product but the price is a bit high.",
          "product_id": "prod_bosch_drill_001",
          "rating": 3
        },
        {
          "id": "oFQXlDtw3ZFlxIoMvKcPv",
          "username": "Sarah Williams",
          "text": "Excellent quality, exceeded my expectations!",
          "product_id": "prod_bosch_drill_001",
          "rating": 5
        },
        {
          "id": "lMh8LAzItKnXK1tMxPUo8",
          "username": "David Jones",
          "text": "Nice product, thinking of buying again.",
          "product_id": "prod_bosch_drill_001",
          "rating": 4
        },
        {
          "id": "ctYI6xoygg46MBPbbpiHh",
          "username": "Jessica Davis",
          "text": "Great product, definitely recommend!",
          "product_id": "prod_sony_headphones_001",
          "rating": 4
        },
        {
          "id": "Dmx_rxKCCNbilq4ukKo2A",
          "username": "Christopher Miller",
          "text": "Very satisfied, quality product and fast delivery.",
          "product_id": "prod_sony_headphones_001",
          "rating": 5
        },
        {
          "id": "jrT-KojvU1u37wWVh8wCT",
          "username": "Amanda Wilson",
          "text": "Good product but the price is a bit high.",
          "product_id": "prod_sony_headphones_001",
          "rating": 3
        },
        {
          "id": "M5-dHzsvj77eh1jfNDgCb",
          "username": "James Moore",
          "text": "Excellent quality, exceeded my expectations!",
          "product_id": "prod_sony_headphones_001",
          "rating": 5
        },
        {
          "id": "S2Gvd3aV8bdg7HJCYT__2",
          "username": "Lisa Anderson",
          "text": "Nice product, thinking of buying again.",
          "product_id": "prod_sony_headphones_001",
          "rating": 4
        },
        {
          "id": "X9XmpRdCM_D48cbt8yID7",
          "username": "Robert Taylor",
          "text": "Great product, definitely recommend!",
          "product_id": "prod_zara_shirt_001",
          "rating": 4
        },
        {
          "id": "UFBoT4vjC1u9qHF_OlKst",
          "username": "Jennifer Thomas",
          "text": "Very satisfied, quality product and fast delivery.",
          "product_id": "prod_zara_shirt_001",
          "rating": 5
        },
        {
          "id": "PiiXO3vYQ2xICbp_QVJ1G",
          "username": "William Jackson",
          "text": "Good product but the price is a bit high.",
          "product_id": "prod_zara_shirt_001",
          "rating": 3
        },
        {
          "id": "3wm9FBWcqvWGiQr_eehE0",
          "username": "Michelle White",
          "text": "Excellent quality, exceeded my expectations!",
          "product_id": "prod_zara_shirt_001",
          "rating": 5
        },
        {
          "id": "sC4Hkdy6ErODSPeZLssnw",
          "username": "Daniel Harris",
          "text": "Nice product, thinking of buying again.",
          "product_id": "prod_zara_shirt_001",
          "rating": 4
        },
        {
          "id": "5339bSE_rAOOUjBQmGnO7",
          "username": "Nicole Martin",
          "text": "Great product, definitely recommend!",
          "product_id": "prod_xiaomi_phone_001",
          "rating": 4
        },
        {
          "id": "bnf31Yb6edi1oeourKdsJ",
          "username": "Matthew Thompson",
          "text": "Very satisfied, quality product and fast delivery.",
          "product_id": "prod_xiaomi_phone_001",
          "rating": 5
        },
        {
          "id": "T-VNSWycYEZ40DPi1W0En",
          "username": "Stephanie Garcia",
          "text": "Good product but the price is a bit high.",
          "product_id": "prod_xiaomi_phone_001",
          "rating": 3
        },
        {
          "id": "Z_CSyxRAxpOeU17Mzjeam",
          "username": "Andrew Martinez",
          "text": "Excellent quality, exceeded my expectations!",
          "product_id": "prod_xiaomi_phone_001",
          "rating": 5
        },
        {
          "id": "0Whmz0HojDHWNjNgDGeUI",
          "username": "Rachel Robinson",
          "text": "Nice product, thinking of buying again.",
          "product_id": "prod_xiaomi_phone_001",
          "rating": 4
        },
        {
          "id": "d_8j9aYjFMmaKawOkK7QZ",
          "username": "John Smith",
          "text": "Great product, definitely recommend!",
          "product_id": "prod_columbia_jacket_001",
          "rating": 4
        },
        {
          "id": "A7O4gAeb64XqUPRtLuyrJ",
          "username": "Emily Johnson",
          "text": "Very satisfied, quality product and fast delivery.",
          "product_id": "prod_columbia_jacket_001",
          "rating": 5
        },
        {
          "id": "ljRIHewiKuzzwMCoQYU4g",
          "username": "Michael Brown",
          "text": "Good product but the price is a bit high.",
          "product_id": "prod_columbia_jacket_001",
          "rating": 3
        },
        {
          "id": "aQ15cbGP65Qcx71QtZl9f",
          "username": "Sarah Williams",
          "text": "Excellent quality, exceeded my expectations!",
          "product_id": "prod_columbia_jacket_001",
          "rating": 5
        },
        {
          "id": "6b_VvpZVgQ93CInoYfS5J",
          "username": "David Jones",
          "text": "Nice product, thinking of buying again.",
          "product_id": "prod_columbia_jacket_001",
          "rating": 4
        },
        {
          "id": "93fbcKZP8bYdNBORbaT63",
          "username": "Jessica Davis",
          "text": "Great product, definitely recommend!",
          "product_id": "prod_nivea_cream_001",
          "rating": 4
        },
        {
          "id": "9n50Mmn3V_Ac4qvf00yh9",
          "username": "Christopher Miller",
          "text": "Very satisfied, quality product and fast delivery.",
          "product_id": "prod_nivea_cream_001",
          "rating": 5
        },
        {
          "id": "bFAsggtbJG9IybNv11lDM",
          "username": "Amanda Wilson",
          "text": "Good product but the price is a bit high.",
          "product_id": "prod_nivea_cream_001",
          "rating": 3
        },
        {
          "id": "hCNn7PCuJoixn321wYjmx",
          "username": "James Moore",
          "text": "Excellent quality, exceeded my expectations!",
          "product_id": "prod_nivea_cream_001",
          "rating": 5
        },
        {
          "id": "fTuOpRJbDT-ourxxHF_0d",
          "username": "Lisa Anderson",
          "text": "Nice product, thinking of buying again.",
          "product_id": "prod_nivea_cream_001",
          "rating": 4
        },
        {
          "id": "OmRIV4aQ62EjhVLboTD8O",
          "username": "Robert Taylor",
          "text": "Great product, definitely recommend!",
          "product_id": "prod_hm_jeans_001",
          "rating": 4
        },
        {
          "id": "6Pmx-KmkAUYsRHEn_0DuL",
          "username": "Jennifer Thomas",
          "text": "Very satisfied, quality product and fast delivery.",
          "product_id": "prod_hm_jeans_001",
          "rating": 5
        },
        {
          "id": "OKqpuP6__7gCA9bHvM2ZM",
          "username": "William Jackson",
          "text": "Good product but the price is a bit high.",
          "product_id": "prod_hm_jeans_001",
          "rating": 3
        },
        {
          "id": "VrChQ-J5akZj6r7UuEUai",
          "username": "Michelle White",
          "text": "Excellent quality, exceeded my expectations!",
          "product_id": "prod_hm_jeans_001",
          "rating": 5
        },
        {
          "id": "0dUt8k1Gcd9OAxiIEyBKK",
          "username": "Daniel Harris",
          "text": "Nice product, thinking of buying again.",
          "product_id": "prod_hm_jeans_001",
          "rating": 4
        }
        
      ]

    await commentRepo.save(resetComments)

    return {
        success: true,
        data: resetComments,
        message: "success",
    }
})
