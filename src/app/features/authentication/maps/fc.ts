// Tuy nhiên, bài toán của chúng ta là tìm đường đi ngắn nhất từ điểm bắt đầu có OrderIndex = 1
// và đi qua tất cả các điểm khác đúng 1 lần. Do đó, ta có thể sử dụng thuật toán nearest neighbor để giải quyết bài toán này.

// Thuật toán nearest neighbor sẽ chọn điểm gần nhất với điểm hiện tại và tiếp tục chọn điểm gần nhất với điểm mới cho
//  đến khi tìm được đường đi qua tất cả các điểm.

export function findShortestPath(data: any) {
    const startIndex = 0; // Vị trí điểm bắt đầu

    // Tính toán khoảng cách giữa các điểm
    const distances: any = [];
    for (let i = 0; i < data.length; i++) {
        distances[i] = [];
        for (let j = 0; j < data.length; j++) {
            distances[i][j] = Math.sqrt(
                (data[i].Longtitude - data[j].Longtitude) ** 2 + (data[i].Latitude - data[j].Latitude) ** 2
            );
        }
    }

    // Sử dụng thuật toán nearest neighbor để tìm đường đi ngắn nhất
    let current = startIndex;
    const visited = [startIndex];
    while (visited.length < data.length) {
        let next = null;
        let minDist = Infinity;
        for (let i = 0; i < data.length; i++) {
            if (i !== current && !visited.includes(i)) {
                if (distances[current][i] < minDist) {
                    minDist = distances[current][i];
                    next = i;
                }
            }
        }
        if (next === null) {
            // Không tìm thấy đường đi đến điểm kế tiếp
            break;
        }
        visited.push(next);
        current = next;
    }

    // Sắp xếp lại thứ tự các điểm theo đường đi ngắn nhất
    const path = visited.map((index) => data[index]);
    const index = path.findIndex((point) => point.OrderIndex === 1);
    const pathStartToEnd = path.slice(index).concat(path.slice(0, index));
    const result = [];
    for (let i = 0; i < pathStartToEnd.length - 1; i++) {
        result.push([pathStartToEnd[i], pathStartToEnd[i + 1]]);
    }
    result.push([pathStartToEnd[pathStartToEnd.length - 1], pathStartToEnd[0]]);
    return result;
}
