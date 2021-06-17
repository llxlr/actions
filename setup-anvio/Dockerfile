FROM busybox:latest
LABEL "maintainer"="llxlr <i@xhlr.top>"

RUN wget https://mirrors.bfsu.edu.cn/anaconda/miniconda/Miniconda3-4.5.4-Linux-x86_64.sh -O ~/miniconda.sh && \
    mkdir /opt && \
    /bin/sh ~/miniconda.sh -b -p /opt/conda && \
    rm ~/miniconda.sh && \
    /opt/conda/bin/conda clean -tipsy && \
    ln -s /opt/conda/etc/profile.d/conda.sh /etc/profile.d/conda.sh && \
    echo ". /opt/conda/etc/profile.d/conda.sh" >> ~/.bashrc && \
    echo "conda activate base" >> ~/.bashrc

ENV PATH /opt/conda/bin:$PATH

RUN . /root/.bashrc && \
    /opt/conda/bin/conda init bash && \
    conda activate base && \
    conda info --envs
