# MovieMonkey — Load & Stress Test Report

This document outlines the results of the performance testing conducted on the MovieMonkey Kubernetes deployment running on AWS EC2.

## 📊 Summary of Capacity Limits

| Attribute | Stable Load (2 Replicas) | High Load (10 Replicas) | Extreme Load (20 Replicas) |
|---|---|---|---|
| **Concurrent Users** | 100 | 1,000 | 2,000 |
| **Throughput (QPS)** | ~400 req/s | ~900 req/s | **~1,333 req/s** |
| **Avg. Latency** | ~80ms | ~370ms | **~980ms** |
| **Error Rate** | 0% | 0.005% | **2.2%** |
| **Node CPU** | ~15% | ~99% | **100% (Saturated)** |

---

## 🧪 Test Cases

### Phase 1: HPA Scaling Validation
- **Objective**: Verify that Horizontal Pod Autoscaler correctly detects CPU spikes and adds replicas.
- **Config**: 200 concurrent users, 100,000 requests.
- **Result**: HPA successfully triggered at 30% CPU threshold, scaling replicas from **2 → 4 → 8** within 60 seconds.

### Phase 2: Production Baseline (10 Replicas)
- **Objective**: Measure performance under standard production limits.
- **Config**: 1,000 concurrent users, 500,000 requests.
- **Result**:
    - Sustained **99% Node CPU** utilization.
    - Success rate: **99.99%**.
    - Average response time: **373ms**.
    - System remained fully responsive with no cascading failures.

### Phase 3: Absolute Saturation Benchmark
- **Objective**: Find the absolute hardware ceiling of the `m7i-flex.large` instance.
- **Config**: 2,000 concurrent users, continuous burst for 30s.
- **Result**:
    - **Total Throughput**: ~1,333 Requests per second.
    - **Pod Replicas**: 20 (Max limit).
    - **Bottleneck**: CPU Saturation. At 2,000 concurrent users, the Node CPU hit 100%, causing latency to climb to ~980ms and some requests to timeout (~2% errors).

---

## 📈 Latency Distribution (at Peak Load)

| Percentile | Latency |
|---|---|
| P10 | 191ms |
| P50 | 359ms |
| **P90** | **544ms** |
| P95 | 671ms |
| P99 | 954ms |

## 💡 Conclusions
1. **Vertical Limit**: The system is CPU-bound. To handle more than 1,300 QPS, the EC2 instance type should be upgraded (e.g., to `m7i.xlarge` or larger).
2. **Efficiency**: The Nginx containerized React app is highly optimized, extracting nearly 100% of available CPU cycles efficiently across all K8s pods.
3. **Resilience**: Even when pegged at 100% CPU, the Kubernetes cluster maintained stability and continued serving requests with a high success rate.

---
*Report generated on February 25, 2026*
