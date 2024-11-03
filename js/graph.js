class Graph {
	constructor(data) {
		this.canvas = document.getElementById("chart");
		if(!this.canvas) {
			console.error("There is no canvas with that id");
			return;
		}
		this.setUpCanvasElement();
		this.dataArr = [];
		if(this.canvas.getContext) {
			console.log(data);
			this.lineColor = "#48ade8"
			this.backgroundColor = "#f2f2f2";
			this.dataArr = data ? data : [];
			this.fullAngle = Math.PI * 2;
			this.aspectRatioX = 4;
			this.aspectRatioY = 3;
			this.idealYAxis = 35;
			this.realYAxisPosition = 35;
			this.ceroY = 0;
			this.context = this.canvas.getContext("2d");
			this.parentContainer = this.canvas.parentElement;
			let styles = window.getComputedStyle(this.parentContainer);
			styles = styles.getPropertyValue("max-width");
			if(styles !== "none") {
				this.idealWidth = styles.replace("px","");
				this.idealWdith = Number(this.idealWidth);
			}
			this.resizeCanvas();
			this.render();
			window.addEventListener("resize", () => this.resizeCanvas());
		} else {
			console.error("Not supported by Browser");
		}

	}
	
	setUpCanvasElement() {
		this.canvas.style.borderWidth = "1px";
		this.canvas.style.borderStyle = "Solid";
		this.canvas.style.borderColor = "#ddd";
		this.canvas.style.borderRadius  = "6px";
	}
	
	resizeCanvas() {
			let aspectRatioHorizontal = 0;
			aspectRatioHorizontal = this.canvas.width = this.parentContainer.offsetWidth;
			aspectRatioHorizontal = aspectRatioHorizontal / this.aspectRatioX;
			this.canvas.height = aspectRatioHorizontal * this.aspectRatioY;
			this.render();
	}

	render() {
		this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
		this.context.fillStyle = this.backgroundColor;
		this.context.fillRect(0,0,this.canvas.width, this.canvas.height);
		this.renderData();
		this.DrawAxis();
	}

	renderData() {
		let realYPosition = this.canvas.height - this.realYAxisPosition;
		let realXPosition = this.canvas.width  - this.realYAxisPosition; 
		let maxValue = Math.max(...this.dataArr);
		let minValue = Math.min(...this.dataArr);
		this.ceroY = this.canvas.height - this.realYAxisPosition - ((0 - minValue) / (maxValue - minValue)) * (this.canvas.height- 2 * this.realYAxisPosition);
		const points = this.dataArr.map((d, i) => {
			const x = this.realYAxisPosition + (i / (this.dataArr.length - 1)) * (this.canvas.width - 2 * this.realYAxisPosition);
        	const y = this.canvas.height - this.realYAxisPosition - ((this.dataArr[i] - minValue) / (maxValue - minValue)) * (this.canvas.height - 2 * this.realYAxisPosition);
			return {x, y};
		});
		this.context.beginPath();
		this.context.strokeStyle = this.lineColor; 
		this.context.lineWidth = (4 * this.canvas.width) / this.idealWidth;
		points.forEach((p,i) => {
			if(i>0)  {
				this.context.lineTo(p.x, p.y);
			} else {
				this.context.moveTo(p.x, p.y);
			}
		});
		console.log(this.fullAngle);
		this.context.stroke();
		this.context.fillStyle = this.lineColor;
    	this.context.strokeStyle = this.backgroundColor;
    	this.context.lineWidth = 3;
		points.forEach((p) => {
			this.drawPoint(p.x,p.y);
		});
	}
	
	drawPoint(x, y) {
		this.context.beginPath();
		this.context.arc(x,y,5,0,this.fullAngle);
		this.context.fill();
		this.context.stroke();
	}

	DrawAxis() {
		this.realYAxisPosition = (this.idealYAxis * this.canvas.width) / this.idealWidth;
		this.context.lineWidth = (4 * this.canvas.width) / this.idealWidth;
		this.context.beginPath();
		this.context.strokeStyle = "#787878";
		this.context.moveTo(this.realYAxisPosition, 0);
		this.context.lineTo(this.realYAxisPosition, this.canvas.height);
		this.context.stroke();
		this.context.moveTo(0, this.ceroY);
		this.context.lineTo(this.canvas.width, this.ceroY);
		this.context.stroke();
	}
}
export default Graph;
