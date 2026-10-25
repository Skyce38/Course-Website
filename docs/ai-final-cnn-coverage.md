# FINAL CNN & Image Operations source coverage

Stable ID `artificial-intelligence-final-cnn`; [lesson](../courses/artificial-intelligence/summaries/final-cnn.md). Eight authored solved exercises; one runnable Python example. All S11 `Final/Intro_DeepLearning_Slides.pdf` physical pp.12–33 viewed as images, including full-size16/23/26/31 for ambiguous text. Source credits preserved, no original screenshots copied.

| Pages | Coverage / verification |
|---|---|
|12–15| CNN spatial tasks/pipeline; synthetic5×5cross;sourcekernel |
|16| all4×4input/kernel values transcribed; first displayed sum=228, matches image cell; caption312 contradicts its own sum. 312 corresponds to flipped kernel, a different convention. Both explained, not silently copied |
|17–18| edge/gradient operator orientation; no invented pixel arrays for source photo |
|19–22| source example layer order, all three3×3 valid outputmaps; no-bias/no-flip/stride1 convention |
|23| all three5×5 zero-padded maps verified |
|24–26| all3×3maxpooled maps; separate4×4pooling example: max[6,8;3,4], exact averages[3.25,4.75;2,2.5]; slide one-decimal3.3/4.8 distinguished from exact values |
|27–30| ReLU source matrix/all pooled maps; map-major/row-major27-valueflatten; FC cannot predict without missing weights; diagram order differs from generic pipeline |
|31–33| RGB source values5/10/20 and kernelsF1/2F1/3F1 (not page22F2/F3); authored numeric channel outputs and sum;9 2Dkernels for3 RGBoutputs;depth3→5→10 stacking |

Shape/parameter formulas are authored prerequisite elaboration (symmetricpadding,dilation1). RGB numeric extension yieldscenter401 and fullsum[-73,85,-73;85,401,85;-73,85,-73]. Layer parameter extensions140+460=600 with biases. No fullCNNtraining, performanceclaim or unprovidedFCweights. Stage E independently compares source maps/operations with SciPy and vectorized pooling, then80 seeded stride/padding/kernel cases and48 randomizedpooling reductions. OriginalPDF untouched.
