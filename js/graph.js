class Graph {
	constructor() {
		this.canvas = document.getElementById("chart");
		if(this.canvas.getContext) {
			this.aspectRatioX = 4;
			this.aspectRatioY = 3;
			this.context = this.canvas.getContext("2d");
			this.parentContainer = this.canvas.parentElement;
			this.resizeCanvas();
			this.render();
		} else {
			console.error("Not supported by Browser");
		}

	}
	
	resizeCanvas() {
		window.addEventListener("resize", (event) => {
			let aspectRatioHorizontal = 0;
			aspectRatioHorizontal = this.canvas.width = this.parentContainer.offsetWidth;
			aspectRatioHorizontal = aspectRatioHorizontal / 4;
			this.canvas.height = aspectRatioHorizontal * 3;
			this.render();
		})
	}

	render() {
		this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
		this.context.fillStyle = "#ff5733";
		this.context.fillRect(0,0,this.canvas.width, this.canvas.height);
		this.DrawAxis();
	}

	DrawAxis() {
		let idealYAxis = 35;
		this.context.lineWidth = 6;
		this.context.beginPath();
		this.context.moveTo(35, 0);
		this.context.lineTo(35, this.canvas.height);
		this.context.stroke();
		this.context.moveTo(0, this.canvas.height - 35);
		this.context.lineTo(this.canvas.width,this.canvas.height - 35);
		this.context.stroke();
	}
}

export default Graph;
