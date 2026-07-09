# 求职跟踪系统 (Job Tracker)

技术栈：Python (Flask) + MySQL + React + Bootstrap

## 项目结构

```
job-tracker/
├── backend/
│   ├── app/
│   │   ├── __init__.py      # Flask app factory
│   │   ├── models.py        # SQLAlchemy 模型
│   │   └── routes.py        # CRUD API 路由
│   ├── config.py            # 数据库配置（从 .env 读取）
│   ├── run.py                # 启动入口
│   ├── requirements.txt
│   ├── schema.sql            # 建库建表 SQL（也可以让 SQLAlchemy 自动建表）
│   └── .env.example
└── frontend/
    └── src/
        ├── components/
        │   ├── JobList.jsx    # 求职记录列表（表格）
        │   └── JobForm.jsx    # 新增/编辑表单（弹窗）
        ├── services/
        │   └── api.js          # 封装对后端 API 的请求
        ├── App.jsx
        └── main.jsx
    └── web-screenshots/
        ├── Home.png

```

## 一、搭建 MySQL 数据库

1. 确保本地已安装并启动 MySQL。
2. 到你的数据库里，运行把schema.sql的SQL 语句以建好你的数据库。

## 二、启动后端 (Flask)

```bash
cd backend
python -m .venv venv
.venv\Scripts\activate          # Windows
# source venv/bin/activate     # macOS/Linux

pip install -r requirements.txt

copy .env.example .env         # Windows，然后编辑 .env 填入你的 MySQL 密码
# cp .env.example .env         # macOS/Linux

python run.py
```

后端会跑在 `http://localhost:5000`，API 前缀是 `/api/jobs`。

> 如果你没有先执行 `schema.sql`，可以在 `run.py` 里临时加两行来自动建表：
>
> ```python
> from app import create_app, db
> app = create_app()
> with app.app_context():
>     db.create_all()
> ```

## 三、启动前端 (React + Vite)

这里用 Vite 创建项目最快，步骤如下（在 `frontend` 目录外层新建）：

```bash
cd frontend
npm create vite@latest . -- --template react
npm install
npm install react-bootstrap bootstrap
```

`npm create vite` 会生成 `package.json`、`index.html`、`vite.config.js` 等基础文件——**注意它可能会覆盖已有的 `src/App.jsx` 和 `src/main.jsx`**，跑完命令后，把本次生成的 `App.jsx`、`main.jsx`、`components/`、`services/` 这几个文件/文件夹重新拷贝覆盖回去即可。

然后启动：

```bash
npm run dev
```

前端默认跑在 `http://localhost:5173`（Vite 默认端口）。

## 四、功能说明

当前 MVP 覆盖：

- 增/删/改/查求职记录（公司、职位、状态、申请日期、渠道、联系人、备注等字段）
- 按状态筛选（已投递 / 面试中 / 已录用 / 已拒绝 / 已撤回）

## 五、web页面

![Home page] (frontend/web-screenshots/Home.png )

## 后续可扩展方向

- 跟进提醒（根据 `follow_up_date` 做到期提醒）
- 数据可视化仪表盘（各状态数量统计、按渠道来源分析）
- 之后按你的计划迁移到 Docker（写 `docker-compose.yml`，包含 mysql + backend + frontend 三个服务）
