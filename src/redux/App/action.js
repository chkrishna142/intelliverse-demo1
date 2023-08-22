import * as types from './action.types';
import axios from 'axios';
import { getElementData } from '../../util/util';
import { baseURL } from '../..';
import { useSelector } from 'react-redux';

// let payload = [
//     {
//         "_id": "634ea387d4ea16d581aa30e7",
//         "id": "fe71ce0f-012b-445e-9612-d4a99f4927ed",
//         "project": "e8242414-8493-45b8-884e-97ce14471825",
//         "iteration": "5992a88a-2fe5-4afa-9249-570af5f9a880",
//         "created": "2022-10-18T13:00:56.257Z",
//         "predictions": [
//             {
//                 "probability": "0.56018263",
//                 "tagId": "2ba075ce-c324-4968-a867-a6c2eb8e20a3",
//                 "tagName": "Healthy",
//                 "_id": "634ea387d4ea16d581aa30e8"
//             },
//             {
//                 "probability": "0.43981743",
//                 "tagId": "0919ba61-b9a0-4f4b-9143-a5d99025779b",
//                 "tagName": "Dusty",
//                 "_id": "634ea387d4ea16d581aa30e9"
//             }
//         ],
//         "image": "https://may20.blob.core.windows.net/mycontainer/photo_2022-06-14_10-55-16.jpg",
//         "__v": 0
//     },
//     {
//         "_id": "634ea38bd4ea16d581aa30eb",
//         "id": "6c0521e6-481f-4e7f-ba04-85bd88dc272c",
//         "project": "e8242414-8493-45b8-884e-97ce14471825",
//         "iteration": "5992a88a-2fe5-4afa-9249-570af5f9a880",
//         "created": "2022-10-18T13:00:59.833Z",
//         "predictions": [
//             {
//                 "probability": "0.5850124",
//                 "tagId": "0919ba61-b9a0-4f4b-9143-a5d99025779b",
//                 "tagName": "Dusty",
//                 "_id": "634ea38bd4ea16d581aa30ec"
//             },
//             {
//                 "probability": "0.4149876",
//                 "tagId": "2ba075ce-c324-4968-a867-a6c2eb8e20a3",
//                 "tagName": "Healthy",
//                 "_id": "634ea38bd4ea16d581aa30ed"
//             }
//         ],
//         "image": "https://may20.blob.core.windows.net/mycontainer/photo_2022-06-14_10-55-26.jpg",
//         "__v": 0
//     },
//     {
//         "_id": "634ea38fd4ea16d581aa30ef",
//         "id": "125913be-f985-4eb6-a27f-d81f55d75558",
//         "project": "e8242414-8493-45b8-884e-97ce14471825",
//         "iteration": "5992a88a-2fe5-4afa-9249-570af5f9a880",
//         "created": "2022-10-18T13:01:04.035Z",
//         "predictions": [
//             {
//                 "probability": "0.56870073",
//                 "tagId": "2ba075ce-c324-4968-a867-a6c2eb8e20a3",
//                 "tagName": "Healthy",
//                 "_id": "634ea38fd4ea16d581aa30f0"
//             },
//             {
//                 "probability": "0.4312992",
//                 "tagId": "0919ba61-b9a0-4f4b-9143-a5d99025779b",
//                 "tagName": "Dusty",
//                 "_id": "634ea38fd4ea16d581aa30f1"
//             }
//         ],
//         "image": "https://may20.blob.core.windows.net/mycontainer/photo_2022-06-14_10-55-53.jpg",
//         "__v": 0
//     },
//     {
//         "_id": "634ea393d4ea16d581aa30f3",
//         "id": "b059d573-3cf4-478c-a068-982a764b53b6",
//         "project": "e8242414-8493-45b8-884e-97ce14471825",
//         "iteration": "5992a88a-2fe5-4afa-9249-570af5f9a880",
//         "created": "2022-10-18T13:01:07.910Z",
//         "predictions": [
//             {
//                 "probability": "0.96398646",
//                 "tagId": "2ba075ce-c324-4968-a867-a6c2eb8e20a3",
//                 "tagName": "Healthy",
//                 "_id": "634ea393d4ea16d581aa30f4"
//             },
//             {
//                 "probability": "0.03601362",
//                 "tagId": "0919ba61-b9a0-4f4b-9143-a5d99025779b",
//                 "tagName": "Dusty",
//                 "_id": "634ea393d4ea16d581aa30f5"
//             }
//         ],
//         "image": "https://may20.blob.core.windows.net/mycontainer/photo_2022-06-14_10-56-03.jpg",
//         "__v": 0
//     },
//     {
//         "_id": "634ea397d4ea16d581aa30f7",
//         "id": "9791addb-6391-4490-a8b0-7d794896a5ec",
//         "project": "e8242414-8493-45b8-884e-97ce14471825",
//         "iteration": "5992a88a-2fe5-4afa-9249-570af5f9a880",
//         "created": "2022-10-18T13:01:11.889Z",
//         "predictions": [
//             {
//                 "probability": "0.9280216",
//                 "tagId": "2ba075ce-c324-4968-a867-a6c2eb8e20a3",
//                 "tagName": "Healthy",
//                 "_id": "634ea397d4ea16d581aa30f8"
//             },
//             {
//                 "probability": "0.071978405",
//                 "tagId": "0919ba61-b9a0-4f4b-9143-a5d99025779b",
//                 "tagName": "Dusty",
//                 "_id": "634ea397d4ea16d581aa30f9"
//             }
//         ],
//         "image": "https://may20.blob.core.windows.net/mycontainer/photo_2022-06-14_10-56-13.jpg",
//         "__v": 0
//     },
//     {
//         "_id": "634ea39bd4ea16d581aa30fb",
//         "id": "570feddd-7431-47a3-9db7-9f3e9508880f",
//         "project": "e8242414-8493-45b8-884e-97ce14471825",
//         "iteration": "5992a88a-2fe5-4afa-9249-570af5f9a880",
//         "created": "2022-10-18T13:01:15.827Z",
//         "predictions": [
//             {
//                 "probability": "0.90290725",
//                 "tagId": "2ba075ce-c324-4968-a867-a6c2eb8e20a3",
//                 "tagName": "Healthy",
//                 "_id": "634ea39bd4ea16d581aa30fc"
//             },
//             {
//                 "probability": "0.097092785",
//                 "tagId": "0919ba61-b9a0-4f4b-9143-a5d99025779b",
//                 "tagName": "Dusty",
//                 "_id": "634ea39bd4ea16d581aa30fd"
//             }
//         ],
//         "image": "https://may20.blob.core.windows.net/mycontainer/photo_2022-06-14_10-56-23.jpg",
//         "__v": 0
//     },
//     {
//         "_id": "634ea39fd4ea16d581aa30ff",
//         "id": "7a372044-0485-491e-aabf-097947744dcb",
//         "project": "e8242414-8493-45b8-884e-97ce14471825",
//         "iteration": "5992a88a-2fe5-4afa-9249-570af5f9a880",
//         "created": "2022-10-18T13:01:20.106Z",
//         "predictions": [
//             {
//                 "probability": "0.64636177",
//                 "tagId": "0919ba61-b9a0-4f4b-9143-a5d99025779b",
//                 "tagName": "Dusty",
//                 "_id": "634ea39fd4ea16d581aa3100"
//             },
//             {
//                 "probability": "0.3536382",
//                 "tagId": "2ba075ce-c324-4968-a867-a6c2eb8e20a3",
//                 "tagName": "Healthy",
//                 "_id": "634ea39fd4ea16d581aa3101"
//             }
//         ],
//         "image": "https://may20.blob.core.windows.net/mycontainer/photo_2022-06-14_11-02-04.jpg",
//         "__v": 0
//     },
//     {
//         "_id": "634ea3a3d4ea16d581aa3103",
//         "id": "5ad7bf53-e6ae-4037-9621-f540f7d0989b",
//         "project": "e8242414-8493-45b8-884e-97ce14471825",
//         "iteration": "5992a88a-2fe5-4afa-9249-570af5f9a880",
//         "created": "2022-10-18T13:01:23.813Z",
//         "predictions": [
//             {
//                 "probability": "0.5286016",
//                 "tagId": "2ba075ce-c324-4968-a867-a6c2eb8e20a3",
//                 "tagName": "Healthy",
//                 "_id": "634ea3a3d4ea16d581aa3104"
//             },
//             {
//                 "probability": "0.47139838",
//                 "tagId": "0919ba61-b9a0-4f4b-9143-a5d99025779b",
//                 "tagName": "Dusty",
//                 "_id": "634ea3a3d4ea16d581aa3105"
//             }
//         ],
//         "image": "https://may20.blob.core.windows.net/mycontainer/photo_2022-06-14_11-07-04.jpg",
//         "__v": 0
//     },
//     {
//         "_id": "634ea3a8d4ea16d581aa3107",
//         "id": "befd5316-7cfc-4e93-9879-279a0791ffab",
//         "project": "e8242414-8493-45b8-884e-97ce14471825",
//         "iteration": "5992a88a-2fe5-4afa-9249-570af5f9a880",
//         "created": "2022-10-18T13:01:28.367Z",
//         "predictions": [
//             {
//                 "probability": "0.5296801",
//                 "tagId": "2ba075ce-c324-4968-a867-a6c2eb8e20a3",
//                 "tagName": "Healthy",
//                 "_id": "634ea3a8d4ea16d581aa3108"
//             },
//             {
//                 "probability": "0.47031996",
//                 "tagId": "0919ba61-b9a0-4f4b-9143-a5d99025779b",
//                 "tagName": "Dusty",
//                 "_id": "634ea3a8d4ea16d581aa3109"
//             }
//         ],
//         "image": "https://may20.blob.core.windows.net/mycontainer/photo_2022-06-14_11-12-04.jpg",
//         "__v": 0
//     },
//     {
//         "_id": "634ea3abd4ea16d581aa310b",
//         "id": "e1c21239-5cae-48a5-9197-e4fdcb8844ae",
//         "project": "e8242414-8493-45b8-884e-97ce14471825",
//         "iteration": "5992a88a-2fe5-4afa-9249-570af5f9a880",
//         "created": "2022-10-18T13:01:31.882Z",
//         "predictions": [
//             {
//                 "probability": "0.55266637",
//                 "tagId": "0919ba61-b9a0-4f4b-9143-a5d99025779b",
//                 "tagName": "Dusty",
//                 "_id": "634ea3abd4ea16d581aa310c"
//             },
//             {
//                 "probability": "0.44733357",
//                 "tagId": "2ba075ce-c324-4968-a867-a6c2eb8e20a3",
//                 "tagName": "Healthy",
//                 "_id": "634ea3abd4ea16d581aa310d"
//             }
//         ],
//         "image": "https://may20.blob.core.windows.net/mycontainer/photo_2022-06-14_11-17-04.jpg",
//         "__v": 0
//     },
//     {
//         "_id": "634ea3afd4ea16d581aa310f",
//         "id": "a2206e01-c7af-406c-87a3-c5047d596e95",
//         "project": "e8242414-8493-45b8-884e-97ce14471825",
//         "iteration": "5992a88a-2fe5-4afa-9249-570af5f9a880",
//         "created": "2022-10-18T13:01:35.934Z",
//         "predictions": [
//             {
//                 "probability": "0.7298016",
//                 "tagId": "2ba075ce-c324-4968-a867-a6c2eb8e20a3",
//                 "tagName": "Healthy",
//                 "_id": "634ea3afd4ea16d581aa3110"
//             },
//             {
//                 "probability": "0.27019846",
//                 "tagId": "0919ba61-b9a0-4f4b-9143-a5d99025779b",
//                 "tagName": "Dusty",
//                 "_id": "634ea3afd4ea16d581aa3111"
//             }
//         ],
//         "image": "https://may20.blob.core.windows.net/mycontainer/photo_2022-06-14_11-22-04.jpg",
//         "__v": 0
//     },
//     {
//         "_id": "634ea3b3d4ea16d581aa3113",
//         "id": "5beab9c7-04ed-44de-bf58-33337d69d257",
//         "project": "e8242414-8493-45b8-884e-97ce14471825",
//         "iteration": "5992a88a-2fe5-4afa-9249-570af5f9a880",
//         "created": "2022-10-18T13:01:39.870Z",
//         "predictions": [
//             {
//                 "probability": "0.55096596",
//                 "tagId": "0919ba61-b9a0-4f4b-9143-a5d99025779b",
//                 "tagName": "Dusty",
//                 "_id": "634ea3b3d4ea16d581aa3114"
//             },
//             {
//                 "probability": "0.44903404",
//                 "tagId": "2ba075ce-c324-4968-a867-a6c2eb8e20a3",
//                 "tagName": "Healthy",
//                 "_id": "634ea3b3d4ea16d581aa3115"
//             }
//         ],
//         "image": "https://may20.blob.core.windows.net/mycontainer/photo_2022-06-14_11-27-04.jpg",
//         "__v": 0
//     },
//     {
//         "_id": "634ea3b7d4ea16d581aa3117",
//         "id": "cbed8c72-ffb9-4ce4-bd71-8de44b537cca",
//         "project": "e8242414-8493-45b8-884e-97ce14471825",
//         "iteration": "5992a88a-2fe5-4afa-9249-570af5f9a880",
//         "created": "2022-10-18T13:01:44.081Z",
//         "predictions": [
//             {
//                 "probability": "0.929978",
//                 "tagId": "2ba075ce-c324-4968-a867-a6c2eb8e20a3",
//                 "tagName": "Healthy",
//                 "_id": "634ea3b7d4ea16d581aa3118"
//             },
//             {
//                 "probability": "0.070021965",
//                 "tagId": "0919ba61-b9a0-4f4b-9143-a5d99025779b",
//                 "tagName": "Dusty",
//                 "_id": "634ea3b7d4ea16d581aa3119"
//             }
//         ],
//         "image": "https://may20.blob.core.windows.net/mycontainer/photo_2022-06-14_11-32-04.jpg",
//         "__v": 0
//     },
//     {
//         "_id": "634ea3bbd4ea16d581aa311b",
//         "id": "afb35651-817d-49c0-b905-d4c0f04ccecd",
//         "project": "e8242414-8493-45b8-884e-97ce14471825",
//         "iteration": "5992a88a-2fe5-4afa-9249-570af5f9a880",
//         "created": "2022-10-18T13:01:47.942Z",
//         "predictions": [
//             {
//                 "probability": "0.6662409",
//                 "tagId": "2ba075ce-c324-4968-a867-a6c2eb8e20a3",
//                 "tagName": "Healthy",
//                 "_id": "634ea3bbd4ea16d581aa311c"
//             },
//             {
//                 "probability": "0.33375916",
//                 "tagId": "0919ba61-b9a0-4f4b-9143-a5d99025779b",
//                 "tagName": "Dusty",
//                 "_id": "634ea3bbd4ea16d581aa311d"
//             }
//         ],
//         "image": "https://may20.blob.core.windows.net/mycontainer/photo_2022-06-14_11-37-04.jpg",
//         "__v": 0
//     },
//     {
//         "_id": "634ea3bfd4ea16d581aa311f",
//         "id": "629a329a-9192-4597-b940-f91b00f95c5f",
//         "project": "e8242414-8493-45b8-884e-97ce14471825",
//         "iteration": "5992a88a-2fe5-4afa-9249-570af5f9a880",
//         "created": "2022-10-18T13:01:51.987Z",
//         "predictions": [
//             {
//                 "probability": "0.8166581",
//                 "tagId": "2ba075ce-c324-4968-a867-a6c2eb8e20a3",
//                 "tagName": "Healthy",
//                 "_id": "634ea3bfd4ea16d581aa3120"
//             },
//             {
//                 "probability": "0.18334197",
//                 "tagId": "0919ba61-b9a0-4f4b-9143-a5d99025779b",
//                 "tagName": "Dusty",
//                 "_id": "634ea3bfd4ea16d581aa3121"
//             }
//         ],
//         "image": "https://may20.blob.core.windows.net/mycontainer/photo_2022-06-14_11-42-04.jpg",
//         "__v": 0
//     },
//     {
//         "_id": "634ea3c3d4ea16d581aa3123",
//         "id": "7bb19b45-23f7-4506-8c9d-0d53dc1583d9",
//         "project": "e8242414-8493-45b8-884e-97ce14471825",
//         "iteration": "5992a88a-2fe5-4afa-9249-570af5f9a880",
//         "created": "2022-10-18T13:01:55.826Z",
//         "predictions": [
//             {
//                 "probability": "0.7161974",
//                 "tagId": "2ba075ce-c324-4968-a867-a6c2eb8e20a3",
//                 "tagName": "Healthy",
//                 "_id": "634ea3c3d4ea16d581aa3124"
//             },
//             {
//                 "probability": "0.28380266",
//                 "tagId": "0919ba61-b9a0-4f4b-9143-a5d99025779b",
//                 "tagName": "Dusty",
//                 "_id": "634ea3c3d4ea16d581aa3125"
//             }
//         ],
//         "image": "https://may20.blob.core.windows.net/mycontainer/photo_2022-06-14_11-47-04.jpg",
//         "__v": 0
//     },
//     {
//         "_id": "634ea3c7d4ea16d581aa3127",
//         "id": "25e6d05f-71c4-4fae-82d6-8c7ca466eeaa",
//         "project": "e8242414-8493-45b8-884e-97ce14471825",
//         "iteration": "5992a88a-2fe5-4afa-9249-570af5f9a880",
//         "created": "2022-10-18T13:01:59.993Z",
//         "predictions": [
//             {
//                 "probability": "0.6400483",
//                 "tagId": "2ba075ce-c324-4968-a867-a6c2eb8e20a3",
//                 "tagName": "Healthy",
//                 "_id": "634ea3c7d4ea16d581aa3128"
//             },
//             {
//                 "probability": "0.35995162",
//                 "tagId": "0919ba61-b9a0-4f4b-9143-a5d99025779b",
//                 "tagName": "Dusty",
//                 "_id": "634ea3c7d4ea16d581aa3129"
//             }
//         ],
//         "image": "https://may20.blob.core.windows.net/mycontainer/photo_2022-06-14_11-52-04.jpg",
//         "__v": 0
//     },
//     {
//         "_id": "634ea3cbd4ea16d581aa312b",
//         "id": "28078dcf-785a-4213-81f3-af21c92e4e33",
//         "project": "e8242414-8493-45b8-884e-97ce14471825",
//         "iteration": "5992a88a-2fe5-4afa-9249-570af5f9a880",
//         "created": "2022-10-18T13:02:04.059Z",
//         "predictions": [
//             {
//                 "probability": "0.7009206",
//                 "tagId": "2ba075ce-c324-4968-a867-a6c2eb8e20a3",
//                 "tagName": "Healthy",
//                 "_id": "634ea3cbd4ea16d581aa312c"
//             },
//             {
//                 "probability": "0.2990794",
//                 "tagId": "0919ba61-b9a0-4f4b-9143-a5d99025779b",
//                 "tagName": "Dusty",
//                 "_id": "634ea3cbd4ea16d581aa312d"
//             }
//         ],
//         "image": "https://may20.blob.core.windows.net/mycontainer/photo_2022-06-14_11-57-05.jpg",
//         "__v": 0
//     },
//     {
//         "_id": "634ea3cfd4ea16d581aa312f",
//         "id": "0a7a35dc-219b-42ec-9b3d-1338cb8fcdf5",
//         "project": "e8242414-8493-45b8-884e-97ce14471825",
//         "iteration": "5992a88a-2fe5-4afa-9249-570af5f9a880",
//         "created": "2022-10-18T13:02:07.965Z",
//         "predictions": [
//             {
//                 "probability": "0.60509026",
//                 "tagId": "2ba075ce-c324-4968-a867-a6c2eb8e20a3",
//                 "tagName": "Healthy",
//                 "_id": "634ea3cfd4ea16d581aa3130"
//             },
//             {
//                 "probability": "0.39490977",
//                 "tagId": "0919ba61-b9a0-4f4b-9143-a5d99025779b",
//                 "tagName": "Dusty",
//                 "_id": "634ea3cfd4ea16d581aa3131"
//             }
//         ],
//         "image": "https://may20.blob.core.windows.net/mycontainer/photo_2022-06-14_12-02-05.jpg",
//         "__v": 0
//     },
//     {
//         "_id": "634ea3d8d4ea16d581aa3137",
//         "id": "868ea8c4-6f27-46d0-9a37-797979ddca34",
//         "project": "e8242414-8493-45b8-884e-97ce14471825",
//         "iteration": "5992a88a-2fe5-4afa-9249-570af5f9a880",
//         "created": "2022-10-18T13:02:16.161Z",
//         "predictions": [
//             {
//                 "probability": "0.7434753",
//                 "tagId": "2ba075ce-c324-4968-a867-a6c2eb8e20a3",
//                 "tagName": "Healthy",
//                 "_id": "634ea3d8d4ea16d581aa3138"
//             },
//             {
//                 "probability": "0.25652474",
//                 "tagId": "0919ba61-b9a0-4f4b-9143-a5d99025779b",
//                 "tagName": "Dusty",
//                 "_id": "634ea3d8d4ea16d581aa3139"
//             }
//         ],
//         "image": "https://may20.blob.core.windows.net/mycontainer/photo_2022-06-14_12-12-05.jpg",
//         "__v": 0
//     },
//     {
//         "_id": "634ea3dbd4ea16d581aa313b",
//         "id": "6073a5fd-c1ec-45a9-8bfd-8e337558f7ec",
//         "project": "e8242414-8493-45b8-884e-97ce14471825",
//         "iteration": "5992a88a-2fe5-4afa-9249-570af5f9a880",
//         "created": "2022-10-18T13:02:19.985Z",
//         "predictions": [
//             {
//                 "probability": "0.5409207",
//                 "tagId": "0919ba61-b9a0-4f4b-9143-a5d99025779b",
//                 "tagName": "Dusty",
//                 "_id": "634ea3dbd4ea16d581aa313c"
//             },
//             {
//                 "probability": "0.45907924",
//                 "tagId": "2ba075ce-c324-4968-a867-a6c2eb8e20a3",
//                 "tagName": "Healthy",
//                 "_id": "634ea3dbd4ea16d581aa313d"
//             }
//         ],
//         "image": "https://may20.blob.core.windows.net/mycontainer/photo_2022-06-14_12-17-05.jpg",
//         "__v": 0
//     },
//     {
//         "_id": "634f7013de3f48232f0a2592",
//         "id": "2ae962bd-d53d-44d1-b3a1-cd9cd28ab37c",
//         "project": "e8242414-8493-45b8-884e-97ce14471825",
//         "iteration": "5992a88a-2fe5-4afa-9249-570af5f9a880",
//         "created": "2022-10-19T03:33:39.586Z",
//         "predictions": [
//             {
//                 "probability": "0.5409207",
//                 "tagId": "0919ba61-b9a0-4f4b-9143-a5d99025779b",
//                 "tagName": "Dusty",
//                 "_id": "634f7013de3f48232f0a2593"
//             },
//             {
//                 "probability": "0.45907924",
//                 "tagId": "2ba075ce-c324-4968-a867-a6c2eb8e20a3",
//                 "tagName": "Healthy",
//                 "_id": "634f7013de3f48232f0a2594"
//             }
//         ],
//         "image": "https://may20.blob.core.windows.net/mycontainer/photo_2022-06-14_12-17-05.jpg",
//         "__v": 0
//     },
//     {
//         "_id": "634f70e611c0af600b0defd1",
//         "id": "10e8b687-24e4-4feb-9960-18fc9f9e3a11",
//         "project": "e8242414-8493-45b8-884e-97ce14471825",
//         "iteration": "5992a88a-2fe5-4afa-9249-570af5f9a880",
//         "created": "2022-10-19T03:37:10.130Z",
//         "predictions": [
//             {
//                 "probability": "0.5409207",
//                 "tagId": "0919ba61-b9a0-4f4b-9143-a5d99025779b",
//                 "tagName": "Dusty",
//                 "_id": "634f70e611c0af600b0defd2"
//             },
//             {
//                 "probability": "0.45907924",
//                 "tagId": "2ba075ce-c324-4968-a867-a6c2eb8e20a3",
//                 "tagName": "Healthy",
//                 "_id": "634f70e611c0af600b0defd3"
//             }
//         ],
//         "image": "https://may20.blob.core.windows.net/mycontainer/photo_2022-06-14_12-17-05.jpg",
//         "__v": 0
//     },
//     {
//         "_id": "634f711a0c72f972ad5b6ee8",
//         "id": "e0815825-8777-4b99-9b8a-690931d4f299",
//         "project": "e8242414-8493-45b8-884e-97ce14471825",
//         "iteration": "5992a88a-2fe5-4afa-9249-570af5f9a880",
//         "created": "2022-10-19T03:38:02.360Z",
//         "predictions": [
//             {
//                 "probability": "0.5409207",
//                 "tagId": "0919ba61-b9a0-4f4b-9143-a5d99025779b",
//                 "tagName": "Dusty",
//                 "_id": "634f711a0c72f972ad5b6ee9"
//             },
//             {
//                 "probability": "0.45907924",
//                 "tagId": "2ba075ce-c324-4968-a867-a6c2eb8e20a3",
//                 "tagName": "Healthy",
//                 "_id": "634f711a0c72f972ad5b6eea"
//             }
//         ],
//         "image": "https://may20.blob.core.windows.net/mycontainer/photo_2022-06-14_12-17-05.jpg",
//         "__v": 0
//     },
//     {
//         "_id": "634f717dd0a5ebf47b99d2a6",
//         "id": "dba58112-4973-4e72-85bf-ebcf9a3da82f",
//         "project": "e8242414-8493-45b8-884e-97ce14471825",
//         "iteration": "5992a88a-2fe5-4afa-9249-570af5f9a880",
//         "created": "2022-10-19T03:39:42.020Z",
//         "predictions": [
//             {
//                 "probability": "0.5409207",
//                 "tagId": "0919ba61-b9a0-4f4b-9143-a5d99025779b",
//                 "tagName": "Dusty",
//                 "_id": "634f717dd0a5ebf47b99d2a7"
//             },
//             {
//                 "probability": "0.45907924",
//                 "tagId": "2ba075ce-c324-4968-a867-a6c2eb8e20a3",
//                 "tagName": "Healthy",
//                 "_id": "634f717dd0a5ebf47b99d2a8"
//             }
//         ],
//         "image": "https://may20.blob.core.windows.net/mycontainer/photo_2022-06-14_12-17-05.jpg",
//         "__v": 0
//     },
//     {
//         "_id": "634f718a2a5ab5e4a1fa70d7",
//         "id": "bc109c08-a2dd-4b45-ade2-7dfada673df8",
//         "project": "e8242414-8493-45b8-884e-97ce14471825",
//         "iteration": "5992a88a-2fe5-4afa-9249-570af5f9a880",
//         "created": "2022-10-19T03:39:54.727Z",
//         "predictions": [
//             {
//                 "probability": "0.5409207",
//                 "tagId": "0919ba61-b9a0-4f4b-9143-a5d99025779b",
//                 "tagName": "Dusty",
//                 "_id": "634f718a2a5ab5e4a1fa70d8"
//             },
//             {
//                 "probability": "0.45907924",
//                 "tagId": "2ba075ce-c324-4968-a867-a6c2eb8e20a3",
//                 "tagName": "Healthy",
//                 "_id": "634f718a2a5ab5e4a1fa70d9"
//             }
//         ],
//         "image": "https://may20.blob.core.windows.net/mycontainer/photo_2022-06-14_12-17-05.jpg",
//         "__v": 0
//     },
//     {
//         "_id": "634f71a767306edd6c6b7530",
//         "id": "620c2257-1066-4486-8a5f-05ce5d79ed54",
//         "project": "e8242414-8493-45b8-884e-97ce14471825",
//         "iteration": "5992a88a-2fe5-4afa-9249-570af5f9a880",
//         "created": "2022-10-19T03:40:23.666Z",
//         "predictions": [
//             {
//                 "probability": "0.5409207",
//                 "tagId": "0919ba61-b9a0-4f4b-9143-a5d99025779b",
//                 "tagName": "Dusty",
//                 "_id": "634f71a767306edd6c6b7531"
//             },
//             {
//                 "probability": "0.45907924",
//                 "tagId": "2ba075ce-c324-4968-a867-a6c2eb8e20a3",
//                 "tagName": "Healthy",
//                 "_id": "634f71a767306edd6c6b7532"
//             }
//         ],
//         "image": "https://may20.blob.core.windows.net/mycontainer/photo_2022-06-14_12-17-05.jpg",
//         "__v": 0
//     },
//     {
//         "_id": "634f89d40493e5ad9436dbb9",
//         "id": "f155aa8c-b853-4ca4-9a7d-7339d2720f29",
//         "project": "e8242414-8493-45b8-884e-97ce14471825",
//         "iteration": "5992a88a-2fe5-4afa-9249-570af5f9a880",
//         "created": "2022-10-19T05:23:32.231Z",
//         "predictions": [
//             {
//                 "probability": "0.5409207",
//                 "tagId": "0919ba61-b9a0-4f4b-9143-a5d99025779b",
//                 "tagName": "Dusty",
//                 "_id": "634f89d40493e5ad9436dbba"
//             },
//             {
//                 "probability": "0.45907924",
//                 "tagId": "2ba075ce-c324-4968-a867-a6c2eb8e20a3",
//                 "tagName": "Healthy",
//                 "_id": "634f89d40493e5ad9436dbbb"
//             }
//         ],
//         "image": "https://may20.blob.core.windows.net/mycontainer/photo_2022-06-14_12-17-05.jpg",
//         "__v": 0
//     },
//     {
//         "_id": "634fc9398ed526acfb9510d2",
//         "id": "cf7fb40d-8274-47ab-beb1-0dc21c84c61c",
//         "project": "e8242414-8493-45b8-884e-97ce14471825",
//         "iteration": "5992a88a-2fe5-4afa-9249-570af5f9a880",
//         "created": "2022-10-19T09:54:01.987Z",
//         "predictions": [
//             {
//                 "probability": "0.5409207",
//                 "tagId": "0919ba61-b9a0-4f4b-9143-a5d99025779b",
//                 "tagName": "Dusty",
//                 "_id": "634fc9398ed526acfb9510d3"
//             },
//             {
//                 "probability": "0.45907924",
//                 "tagId": "2ba075ce-c324-4968-a867-a6c2eb8e20a3",
//                 "tagName": "Healthy",
//                 "_id": "634fc9398ed526acfb9510d4"
//             }
//         ],
//         "image": "https://may20.blob.core.windows.net/mycontainer/photo_2022-06-14_12-17-05.jpg",
//         "__v": 0
//     },
//     {
//         "_id": "6357892423d1b52516f145f9",
//         "id": "91a69ba8-259e-4ca2-a342-0e2025fe5eaa",
//         "project": "e8242414-8493-45b8-884e-97ce14471825",
//         "iteration": "5992a88a-2fe5-4afa-9249-570af5f9a880",
//         "created": "2022-10-25T06:58:46.813Z",
//         "predictions": [
//             {
//                 "probability": "0.5409207",
//                 "tagId": "0919ba61-b9a0-4f4b-9143-a5d99025779b",
//                 "tagName": "Dusty",
//                 "_id": "6357892423d1b52516f145fa"
//             },
//             {
//                 "probability": "0.45907924",
//                 "tagId": "2ba075ce-c324-4968-a867-a6c2eb8e20a3",
//                 "tagName": "Healthy",
//                 "_id": "6357892423d1b52516f145fb"
//             }
//         ],
//         "image": "https://may20.blob.core.windows.net/mycontainer/photo_2022-06-14_12-17-05.jpg",
//         "__v": 0
//     },
//     {
//         "_id": "63578a953af92eac71151bbc",
//         "id": "8d685b59-8018-44d0-823f-e191672483d3",
//         "project": "e8242414-8493-45b8-884e-97ce14471825",
//         "iteration": "5992a88a-2fe5-4afa-9249-570af5f9a880",
//         "created": "2022-10-25T07:04:55.614Z",
//         "predictions": [
//             {
//                 "probability": "0.5409207",
//                 "tagId": "0919ba61-b9a0-4f4b-9143-a5d99025779b",
//                 "tagName": "Dusty",
//                 "_id": "63578a953af92eac71151bbd"
//             },
//             {
//                 "probability": "0.45907924",
//                 "tagId": "2ba075ce-c324-4968-a867-a6c2eb8e20a3",
//                 "tagName": "Healthy",
//                 "_id": "63578a953af92eac71151bbe"
//             }
//         ],
//         "image": "https://may20.blob.core.windows.net/mycontainer/photo_2022-06-14_12-17-05.jpg",
//         "__v": 0
//     },
//     {
//         "_id": "63578d627114a5ca4a97db3d",
//         "id": "ef8aa786-0a5a-42bd-bf08-e5cb0d075b3f",
//         "project": "e8242414-8493-45b8-884e-97ce14471825",
//         "iteration": "5992a88a-2fe5-4afa-9249-570af5f9a880",
//         "created": "2022-10-25T07:16:52.398Z",
//         "predictions": [
//             {
//                 "probability": "0.5409207",
//                 "tagId": "0919ba61-b9a0-4f4b-9143-a5d99025779b",
//                 "tagName": "Dusty",
//                 "_id": "63578d627114a5ca4a97db3e"
//             },
//             {
//                 "probability": "0.45907924",
//                 "tagId": "2ba075ce-c324-4968-a867-a6c2eb8e20a3",
//                 "tagName": "Healthy",
//                 "_id": "63578d627114a5ca4a97db3f"
//             }
//         ],
//         "image": "https://may20.blob.core.windows.net/mycontainer/photo_2022-06-14_12-17-05.jpg",
//         "__v": 0
//     }
// ]

export const getDataAPI = (plant_name, access_token) => (dispatch) => {
  let url = baseURL + `list/?plant_name=${plant_name}`;
  axios
    .get(url, {
      headers: {
        Authorization: 'Token ' + access_token,
      },
    })
    .then((res) => {
      // only return the first 500 data
      console.log('data', res.data);
      dispatch({
        type: types.GETDATA_SUCCESS,
        payload: res.data.map((item) => getElementData(item)),
      });
    })
    .catch((err) => {
      console.error(err);
    });
};
